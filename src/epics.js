import 'rxjs';
import { combineEpics } from 'redux-observable';
import { FETCH_USER } from './constants';
import { fetchUserSuccess, fetchUserFailed } from './actions';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

export const fetchUser = actions$ =>
  actions$.pipe(
    ofType(FETCH_USER),
    mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload.username}`)
        .pipe(
            map(user => fetchUserSuccess(user))
        .takeUntil(actions$.ofType(FETCH_USER))
        .retry(2)
        .catch(error => Observable.of(fetchUserFailed()))
        )
    )
  )


export default combineEpics(
  fetchUser
);