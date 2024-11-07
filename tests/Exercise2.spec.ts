import { test, expect } from '@playwright/test';

//API Automation: GET Request Status Code Verification

test.describe('GET Request Status Code Verification', () => {
    test('Return status code 200', async ({ request }) => {
     
        const response = await request.get('https://reqres.in/api/users');
        

        
        expect(response.status()).toBe(200);

    
        console.log(await response.json());
    });
});
