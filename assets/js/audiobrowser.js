            // Get references to the radio inputs and isotope items
            const radioButtons = document.querySelectorAll('input[name="isotope-filter"]');
            const isotopeBox = document.querySelector('.isotope-box'); // Parent container
            const isotopeItems = document.querySelectorAll('.isotope-item');
          
            // Add event listeners to the radio inputs
            radioButtons.forEach(radio => {
              radio.addEventListener('change', event => {
                const selectedType = event.target.getAttribute('data-type');
                
                // Apply hidden class to items that don't match the selected type
                isotopeItems.forEach(item => {
                  if (selectedType !== '*' && item.getAttribute('data-type') !== selectedType) {
                    item.classList.add('hidden');
                  } else {
                    item.classList.remove('hidden');
                  }
                });
                
                // Reorder the isotope items based on their visibility
                isotopeItems.forEach(item => {
                  if (item.classList.contains('hidden')) {
                    isotopeBox.appendChild(item); // Move hidden items to the end
                  } else {
                    isotopeBox.prepend(item); // Move visible items to the beginning
                  }
                });
              });
            });