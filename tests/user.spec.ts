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

test('Get all data of users registered',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox',{name:'Username'}).fill('Admin');
    await page.getByRole('textbox',{name:'Password'}).fill('admin123');
    await page.getByRole('button',{name:'Login'}).click();

    await page.getByRole('link',{name:'Admin'}).click();

    await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('User Management ').click();
    await page.getByRole('menuitem',{name:'Users'}).click();

    const rows = page.getByRole('table').getByRole('row')
    const columns = rows.nth(1).getByRole('cell')
    
    const userdata: string[][]=[]
    
    const rowCounts = await rows.count()
    const columnsCounts = await columns.count()
    
    for (let i=1;i<rowCounts;i++){
        
        userdata[i-1]=[]
        
        for(let j=1;j<columnsCounts;j++){
            
            const cell = rows.nth(i).getByRole('cell').nth(j)
            const data = await cell.textContent()
            if(data){
                userdata[i-1][j-1]=data
            }
        }        
    }
    console.log(userdata)
})

test('(Improved) Get all data of users registered',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox',{name:'Username'}).fill('Admin');
    await page.getByRole('textbox',{name:'Password'}).fill('admin123');
    await page.getByRole('button',{name:'Login'}).click();

    await page.getByRole('link',{name:'Admin'}).click();

    await page.getByRole('navigation',{name:'Topbar Menu'}).getByText('User Management ').click();
    await page.getByRole('menuitem',{name:'Users'}).click();

    const rows = page.getByRole('table').getByRole('row')
    const columns = rows.nth(1).getByRole('cell')
    
    //Mejora sugerida por Gemini

    const userdata: string[][] = [];

    // 1. Obtenemos todas las filas como un arreglo de localizadores de Playwright
    const allRows = await rows.all();

    // Empezamos en 1 si quieres saltarte la fila de encabezados (headers)
    for(let i = 1; i < allRows.length; i++){
        // Localizamos todas las celdas de ESTA fila específica
        const cellsInRow = allRows[i].getByRole('cell');

        // Extraemos los textos de todas las celdas de la fila en UN SOLO await
        const rowTexts = await cellsInRow.allTextContents();
        // rowTexts ahora es un vector de strings: ['dato1', 'dato2', 'dato3']

        // Si necesitas saltarte la primera columna (por ejemplo, si es un checkbox o ID):
        // Usamos .slice(1) para tomar desde la columna 1 en adelante
        const filteredRowData = rowTexts.slice(1);

        // Guardamos la fila limpia directamente en nuestra matriz
        userdata.push(filteredRowData);
    }
    console.log(userdata);
})