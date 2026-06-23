import { test } from '@playwright/test'

test('Login Sauce Demo', async ({ page }) => { 

    await page.goto('https://www.saucedemo.com/')

    //Vamos a  elegir el Username de manera aletoria. 
    
    //Primero cargamos en una constante la lista de posibles username
    const usernamesLsLocator = await page.locator('#login_credentials');
    await usernamesLsLocator.waitFor({state:'visible'});
    const usernamesLsText = await usernamesLsLocator.innerText();
    
    //Limpiamos el texto
    const usernames = usernamesLsText
        .split('\n')
        .map(user => user.trim())
        .filter(user => user !== '' && !user.includes('Accepted usernames are:'));

    //seleccionar un indice aleatorio
    const randomIndex = Math.floor(Math.random() * usernames.length);
    const randomUser = usernames[randomIndex];

    console.log(`El usuario seleccionado para este test es: ${randomUser}`);

    await page.getByRole('textbox',{name:'Username'}).fill(randomUser)
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce')
    
    
    await page.getByRole('button',{name:'Login'}).click()
})