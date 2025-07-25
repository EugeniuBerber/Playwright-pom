import {expect, request, test,} from "@playwright/test";

let petID = 142023;
test.describe.serial('Test the POST and GET methods of the Petstore API | @API', () => {
    test("POST add new pet to the store", async ({}) => {
        // URL to Swagger: https://petstore.swagger.io/#/pet/addPet
        const apiContext = await request.newContext({
            baseURL: "https://petstore.swagger.io",
            extraHTTPHeaders: {
                "accept": "application/json",
                "Content-Type": "application/json",
            }
        });
        const response = await apiContext.post('/v2/pet',
            {
                data: {
                    "id": `${petID}`,
                    "category": {
                        "id": 0,
                        "name": "string"
                    },
                    "name": "doggie",
                    "photoUrls": [
                        "string"
                    ],
                    "tags": [
                        {
                            "id": 0,
                            "name": "string"
                        }
                    ],
                    "status": "available"
                }
            });

        const body = await response.json();
        console.log(JSON.stringify(body)); // log as String
        console.log(body); // log as Object
        expect(body).toHaveProperty('id');
        // expect(body.id).toBe(petID);
        expect(typeof body.name).toBe('string');
        expect(typeof body.photoUrls).toBe('object');
        expect(body.status).toBe('available');
        console.log(body.tags);
        console.log('tags.id = ' + JSON.stringify(body.tags[0].id));
    });
    test('GET pet by ID', async ({}) => {
        const apiContext = await request.newContext({
            baseURL: "https://petstore.swagger.io",
            extraHTTPHeaders: {
                "accept": "application/json",
                "api_key": "special-key"
            }
        });
        async function getPetById(apiContext, petID: any) {
            const response = await apiContext.get(`/v2/pet/${petID}`);
            console.log('Pet ID passed to get method: ' + petID);
            expect(response.status()).toBe(200);
            return await response.json();
        }
        const responseBody = await getPetById(apiContext, petID);
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.name).toBe("doggie");
    });
})