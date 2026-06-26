import test from "@playwright/test";


test('Get all usernames Registered',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox',{name:'Username'}).fill('Admin');
    await page.getByRole('textbox',{name:'Password'}).fill('admin123');
    await page.getByRole('button',{name:'Login'}).click();

    await page.getByRole('link',{name:'Admin'}).click();

    await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('User Management ').click();
    await page.getByRole('menuitem',{name:'Users'}).click();
    
    const rows = page.getByRole('table').getByRole('row')
    const usernames: string[] = []
    const rowCounts = await rows.count()


    for (let i=1;i<rowCounts;i++){
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()
        if(username){
            usernames.push(username)
        }
    }
    console.log(usernames)
})