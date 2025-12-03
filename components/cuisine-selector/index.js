Component({
  properties: {
    cuisineSections: {
      type: Array,
      value: []
    },
    selectedCuisineId: {
      type: String,
      optionalTypes: [Number],
      value: null
    }
  },

  data: {
    stackIndices: [], // [0, 0] - current index for each section
    cardStyles: [],   // [['style1', 'style2'], ...]
    
    // Touch state
    touchState: {
      startX: 0,
      currentX: 0,
      isDragging: false,
      sectionIndex: -1
    }
  },

  observers: {
    'cuisineSections, selectedCuisineId': function(sections, selectedId) {
      if (!sections || sections.length === 0) return;
      
      // Initialize indices based on selection
      const indices = sections.map((section, sIdx) => {
        // If we already have an index for this section, keep it unless selection forces change
        // But usually selection drives the deck.
        if (selectedId) {
          const idx = section.items.findIndex(item => item.id === selectedId);
          if (idx >= 0) return idx;
        }
        // Fallback to existing or 0
        return (this.data.stackIndices && this.data.stackIndices[sIdx]) || 0;
      });
      
      this.setData({ stackIndices: indices }, () => {
        // Render initial styles for all sections
        indices.forEach((idx, sIdx) => {
          this.updateStackStyles(sIdx, 0);
        });
      });
    }
  },

  methods: {
    onTouchStart(e) {
      if (this.data.touchState.isDragging) return;
      
      const { sectionIndex } = e.currentTarget.dataset;
      const touch = e.touches[0];
      
      this.data.touchState = {
        startX: touch.clientX,
        currentX: touch.clientX,
        isDragging: true,
        sectionIndex: sectionIndex
      };
    },

    onTouchMove(e) {
      if (!this.data.touchState.isDragging) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - this.data.touchState.startX;
      this.data.touchState.currentX = touch.clientX;
      
      // Update UI
      this.updateStackStyles(this.data.touchState.sectionIndex, deltaX);
    },

    onTouchEnd(e) {
      if (!this.data.touchState.isDragging) return;
      
      const { startX, currentX, sectionIndex } = this.data.touchState;
      const deltaX = currentX - startX;
      const threshold = 100; // Swipe threshold
      
      let currentIndex = this.data.stackIndices[sectionIndex];
      const items = this.properties.cuisineSections[sectionIndex].items;
      
      let newIndex = currentIndex;
      
      if (deltaX < -threshold) {
        // Swipe Left -> Next
        if (currentIndex < items.length - 1) {
          newIndex = currentIndex + 1;
        }
      } else if (deltaX > threshold) {
        // Swipe Right -> Prev
        if (currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
      }
      
      // Reset state
      this.data.touchState.isDragging = false;
      
      // Update Index and Redraw
      const indices = this.data.stackIndices;
      indices[sectionIndex] = newIndex;
      
      this.setData({ stackIndices: indices }, () => {
        this.updateStackStyles(sectionIndex, 0);
        
        // Trigger select event
        if (newIndex !== currentIndex) {
          const item = items[newIndex];
          this.triggerEvent('select', { id: item.id });
        }
      });
    },

    updateStackStyles(sectionIndex, offset) {
      const currentIndex = this.data.stackIndices[sectionIndex];
      const items = this.properties.cuisineSections[sectionIndex].items;
      const screenWidth = 300; // Approximate card width reference for progress
      
      const styles = items.map((item, i) => {
        const k = i - currentIndex;
        let style = '';
        
        // Deterministic random angle for "messy" stack look
        const messyAngle = ((i * 7) % 15) - 7; // Approx -7 to 7 deg
        // Deterministic random X/Y offsets for "top-down" messy pile look
        const messyX = ((i * 13) % 51) - 25; // -25 to 25 rpx
        const messyY = ((i * 17) % 51) - 25; // -25 to 25 rpx
        
        // Logic:
        // k=0: Current Top.
        // k>0: Next cards (stacked behind).
        // k<0: Prev cards (offscreen left).
        
        if (offset < 0) {
          // DRAGGING LEFT (Next)
          
          if (k === 0) {
            // Current card moves left
            style = `transform: translateX(${offset}px) rotate(${offset * 0.05}deg); opacity: 1; z-index: 100;`;
          } else if (k === 1) {
             // Next card comes to center (reset messy offsets)
             const progress = Math.min(Math.abs(offset) / screenWidth, 1);
             // Scale from 0.9 to 1
             const scale = 0.9 + (0.1 * progress);
             
             // Interpolate position from messy to 0
             const currentX = messyX * (1 - progress);
             const currentY = messyY * (1 - progress);
             const currentAngle = messyAngle * (1 - progress);
             
             style = `transform: translate(${currentX}rpx, ${currentY}rpx) scale(${scale}) rotate(${currentAngle}deg); opacity: 1; z-index: 99;`;
          } else if (k > 1) {
             // Other next cards - stay messy
             // Slightly scale them down further based on stack depth? Or just keep them as a pile?
             // Let's keep them as a pile behind
             const scale = 0.9; 
             style = `transform: translate(${messyX}rpx, ${messyY}rpx) scale(${scale}) rotate(${messyAngle}deg); opacity: 1; z-index: ${100-k};`;
          } else {
             // Prev cards (k < 0) - already gone
             style = `transform: translateX(-200%); opacity: 0;`;
          }
          
        } else if (offset > 0) {
          // DRAGGING RIGHT (Prev)
          
          if (k === -1) {
             // Previous card moves in from left
             const startX = -screenWidth * 1.5;
             const currentX = startX + offset * 1.5; 
             style = `transform: translateX(${Math.min(currentX, 0)}px) rotate(${(currentX) * 0.05}deg); opacity: 1; z-index: 101;`; 
          } else if (k === 0) {
             // Current card becomes "Next" (becomes messy)
             const progress = Math.min(offset / screenWidth, 1);
             const scale = 1 - (0.1 * progress);
             
             // Interpolate from 0 to messy
             const currentX = messyX * progress;
             const currentY = messyY * progress;
             const currentAngle = messyAngle * progress;
             
             style = `transform: translate(${currentX}rpx, ${currentY}rpx) scale(${scale}) rotate(${currentAngle}deg); opacity: 1; z-index: 100;`;
          } else if (k > 0) {
             // Next cards
             const scale = 0.9;
             style = `transform: translate(${messyX}rpx, ${messyY}rpx) scale(${scale}) rotate(${messyAngle}deg); opacity: 1; z-index: ${100-k};`;
          } else {
             // Other prev cards (k < -1)
             style = `transform: translateX(-200%); opacity: 0;`;
          }
          
        } else {
          // IDLE / RESET
          if (k === 0) {
            style = `transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; z-index: 100;`;
          } else if (k > 0) {
            // Pile behind
            style = `transform: translate(${messyX}rpx, ${messyY}rpx) scale(0.9) rotate(${messyAngle}deg); opacity: 1; z-index: ${100-k};`;
          } else {
            style = `transform: translateX(-200%); opacity: 0;`;
          }
        }
        
        return style;
      });
      
      this.setData({
        [`cardStyles[${sectionIndex}]`]: styles
      });
    },

    onCardTap(e) {
      // Allow tap to select if not dragging
      if (this.data.touchState.isDragging) return;
      
      const { id, index } = e.currentTarget.dataset;
      
      this.triggerEvent('select', { id });
    },

    prevStep() {
      this.triggerEvent('prev');
    },

    onGenerate() {
      if (!this.properties.selectedCuisineId) {
        wx.showToast({ title: '请选择一种菜系', icon: 'none' });
        return;
      }
      this.triggerEvent('generate');
    }
  }
});
