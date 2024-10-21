import { ReversePipe } from './reverse.pipe';

fdescribe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const res = pipe.transform("roma");

    expect(res).toEqual("amor");
  })

  it('should transform "arepera" to "arepera"', () => {
    const pipe = new ReversePipe();
    const res = pipe.transform("arepera");

    expect(res).toEqual("arepera");
  })
});
