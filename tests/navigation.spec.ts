import test, {expect} from '@playwright/test'

test('Check left menu options', async({page}) => {
    
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox',{name:'Username'}).fill('Admin');
    await page.getByRole('textbox',{name:'Password'}).fill('admin123');
    await page.getByRole('button',{name:'Login'}).click();
    
    await expect(page.getByRole('link',{name:'Dashboard'})).toBeVisible();

    //Vamos a capturar el elemento de la lista
    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()
    console.log ('Current menu items count',currentMenuItemsCount)

    //vamos a almacenar los textos de cada item del menu

    const currentMenuItems: string[] = []

    for (let i = 0; i < currentMenuItemsCount; i++){
        const menuText = await leftMenuItems.nth(i).innerText()
        currentMenuItems.push(menuText)
    }

    console.log(currentMenuItems)

    const expectedMenuItems = [
         'Admin','PIM','Leave','Time','Recruitment','My Info',
         'Performance','Dashboard','Directory','Maintenance','Claim','Buzz'
    ];

    //asercion para ver si lo obtenido es igual a lo esperado

    expect(currentMenuItems).toEqual(expectedMenuItems)

    //se requiere asercion para identificar si el primer elemento del menu es Admin

    const firstMenuItemElement = currentMenuItems[0]

    expect(firstMenuItemElement).toEqual('Admin')

})