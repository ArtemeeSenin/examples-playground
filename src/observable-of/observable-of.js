import { Observable, from, of } from 'rxjs';
import { mergeMap, flatMap } from 'rxjs/operators'

const values$ = from([
    of(1, 2, 3),
    of(4, 5, 6),
    of(7, 8, 9)
])

values$.pipe(
    flatMap( v => v ))
    .subscribe(v => console.log(v))