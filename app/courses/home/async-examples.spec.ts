import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async testing Examples", () => {
    it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {

        let test = false;

        setTimeout(() => {

            console.log('running assertions');

            test = true;

            expect(test).toBeTruthy();

            done();

        }, 1000);

    });

    //ALTERNATIVE TO JASMINE DONE:
    it('Asynchronous test example - setTimeout()', fakeAsync(() => {
        let test = false;
        setTimeout(() => {});
        setTimeout(() => {
            console.log('running assertions setTimeout');
            test = true;
        }, 1000);
        flush();
        expect(test).toBeTruthy();
    }));

    /* it('Asynchronous test example - plain Promise', () => {
        let test = false;
        console.log('Creating promise');
        setTimeout(() => {
            console.log('setTimeout() first callback trigerred.');
        });
        setTimeout(() => {
            console.log('setTimeout() second callback trigerred.');
        });
        Promise.resolve().then(() => {
            console.log('Promise first then() evaluated succesfully');
            return Promise.resolve();
        }).then(() => {
            console.log('Promise second then() evaluated succesfully');
            test = true;
        });
        console.log('Running test assertions');
        expect(test).toBeTruthy();
    }); */
    /* CONSOLE OUTPUT
            Creating promise
            Running test assertions
            Promise first then() evaluated succesfully
            Promise second then() evaluated succesfully
            setTimeout() first callback trigerred.
            setTimeout() second callback trigerred.*/
    

    it('Asynchronous test example - plain Promise FAKEASYNC', fakeAsync(() => {
        let test = false;
        console.log('Creating promise');
        
        Promise.resolve().then(() => {
            console.log('Promise first then() evaluated succesfully');
            test = true;
            return Promise.resolve();
        }).then(() => {
            console.log('Promise second then() evaluated succesfully');
        });
        flushMicrotasks();
        console.log('Running test assertions');
        expect(test).toBeTruthy();
    }));
        /* CONSOLE OUTPUT
            Creating promise
            Promise first then() evaluated succesfully
            Promise second then() evaluated succesfully
            Running test assertions*/

    it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
        let counter = 0;
        Promise.resolve()
            .then(() => {
                counter +=10;
                setTimeout(() => {
                    counter += 1;
                }, 1000);
            });
        expect(counter).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        tick(500);  
        expect(counter).toBe(10);
        tick(500);  
        expect(counter).toBe(11);
    }));

    it('Asynchronous test example - Observables', fakeAsync(() => {
        let test = false;
        console.log('Creating Observable');
        const test$ = of(test).pipe(delay(1000));
        test$.subscribe(() => {
            test = true;
        });
        tick(1000);
        console.log('Running test assertions');
        expect(test).toBe(true);
    }));

});