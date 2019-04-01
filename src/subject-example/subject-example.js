import {Subject, Observable, interval} from 'rxjs';
import {map, take} from "rxjs/operators";

const subject$ = new Subject();
const source$ = interval(300).pipe(
  map( v => `Interval message #${v}`),
  take(5)
);

source$.subscribe(subject$);

subject$.subscribe(
  next => console.log(`Next: ${next}`),
  error => console.log(`Error: ${error}`),
  () => console.log('Completed')
);

subject$.next('Our message #1');
subject$.next('Our message #2');

setTimeout(subject$.complete, 1000);
