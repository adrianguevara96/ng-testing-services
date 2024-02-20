import { Person } from "./person.model";

describe('Tests for Person', () => {
  let person: Person;
  beforeEach( () => {
    person = new Person('Adrian', 'Guevara', 28, 78, 1.76);
  });

  describe('test attributes', () => {
    it('attributes', () => {
      expect(person.name).toEqual('Adrian');
      expect(person.lastName).toEqual('Guevara');
      expect(person.age).toEqual(28);
      expect(person.weight).toEqual(78);
      expect(person.height).toEqual(1.76);
    })

  })

  describe('test for calcIMC', () => {
    it('should return a string: down', () => {
      person.weight = 40;
      const response = person.calcIMC();

      expect(response).toEqual('down');
    });

    it('should return a string: normal', () => {
      const response = person.calcIMC();

      expect(response).toEqual('normal');
    });

    it('should return a string: overweight', () => {
      person.weight = 87;
      const response = person.calcIMC();

      expect(response).toEqual('overweight');
    });

    it('should return a string: overweight lv 1', () => {
      person.weight = 100;
      const response = person.calcIMC();

      expect(response).toEqual('overweight lv 1');
    });

    it('should return a string: overweight lv 2', () => {
      person.weight = 110;
      const response = person.calcIMC();

      expect(response).toEqual('overweight lv 2');
    });

    it('should return a string: overweight lv 3', () => {
      person.weight = 140;
      const response = person.calcIMC();

      expect(response).toEqual('overweight lv 3');
    });
  })
})
