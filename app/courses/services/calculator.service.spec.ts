import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

//xdescribe - TO OFF WHOLE TEST
//fdescribe - TO FOCUS ON WHOLE TEST
describe('CalculatorService', () => {
 
    let calculator: CalculatorService,
        loggerSpy: any;
    beforeEach(() => {
        console.log("Calling beforeEach");
        /*const logger = new LoggerService();
        spyOn(logger, 'log'); */ //OR:
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
        
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        });
        //calculator = new CalculatorService(loggerSpy); //OR:
        calculator = TestBed.get(CalculatorService);
    })

    //xit - TO OFF ONE TEST UNIT
    //fit - TO TO FOCUS ON ONE TEST UNIT AND SKEEP THE OTHERS
    it('should add two numbers', () => {
        //pending();
        console.log("add test");
        const result = calculator.add(2, 2);
        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });


    it('should subtrack two numbers', () => {
        console.log("subtrack test");
        /*const calculator = new CalculatorService(new LoggerService());
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0, "unexpected subtracktion result");*/ //OR:
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0, "unexpected subtracktion result");
        expect(loggerSpy.log).toHaveBeenCalledTimes(1); 
    });

});