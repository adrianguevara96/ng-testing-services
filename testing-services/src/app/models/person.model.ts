export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number,
  ) {}

  calcIMC(): string {
    const result = Math.round( this.weight / ( this.height * 2 ) );
    // 0 - 18 = down
    // 19 - 24 = normal
    // 25 - 26 = overweight
    // 27 - 29 = overweight lv 1
    // 30 - 39 = overweight lv 2
    // 40 = overweight lv 3
    if ( result  >= 0 && result <= 18) {
      return 'down'
    } else if ( result  >= 19 && result <= 24) {
      return 'normal'
    } else if ( result  >= 25 && result <= 26) {
      return 'overweight'
    } else if ( result  >= 27 && result <= 29) {
      return 'overweight lv 1'
    } else if ( result  >= 30 && result <= 39) {
      return 'overweight lv 2'
    } else if ( result  >= 40 ) {
      return 'overweight lv 3'
    } else {
      return 'not found';
    }
  }
}
