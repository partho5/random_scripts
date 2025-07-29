/* 
 * Author: Partho  
 * Last tested: June 29, 2025  
 * Description: Automates the process of unfriending on Facebook by clicking all "More options" menus, 
 * then selecting and confirming "Unfriend" actions sequentially with appropriate delays for UI response.
 */


// Step 1: Count and click all 3-dot "More options" buttons
const moreButtons = document.querySelectorAll('div[aria-label*="More options"]');
console.log(`Found ${moreButtons.length} "More options" buttons`);

// Click all 3-dot buttons first
moreButtons.forEach((button, index) => {
    setTimeout(() => {
        button.click();
        console.log(`Clicked more options ${index + 1}/${moreButtons.length}`);
    }, index * 200); // 200ms delay between clicks
});

// Step 2: Wait for menus to appear, then click unfriend buttons
setTimeout(() => {
    const unfriendButtons = document.querySelectorAll('div.x78zum5.xdt5ytf.xz62fqu.x16ldp7u');
    let unfriendCount = 0;
    
    unfriendButtons.forEach((button, index) => {
        const span = button.querySelector('span[dir="auto"]');
        if (span && span.textContent.trim() === 'Unfriend') {
            setTimeout(() => {
                button.click();
                console.log(`Clicked unfriend ${++unfriendCount}`);
                
                // Step 3: Wait for confirm dialog and click it
                setTimeout(() => {
                    const confirmButton = document.querySelector('div[aria-label="Confirm"]');
                    if (confirmButton) {
                        confirmButton.click();
                        console.log(`Confirmed unfriend ${unfriendCount}`);
                    }
                }, 500); // Wait 500ms for dialog to appear
                
            }, index * 2000); // 2 second delay between each unfriend process
        }
    });
    
    console.log(`Found ${unfriendCount} unfriend buttons to process`);
}, (moreButtons.length * 200) + 1000); // Wait for all menus to open plus 1 second buffer
