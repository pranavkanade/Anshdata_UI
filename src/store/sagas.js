import {
  call,
  put,
  takeEvery,
  take,
  all,
  takeLeading
} from "redux-saga/effects";
import actionTypes from "./actionTypes";
import { getTopPopularCoursesWithSaga } from "../Requests/Courses";
import { verifyUserToken } from "../Requests/Authentication";
import {
  storeTopCourses,
  storeUserVerify,
  storeUserSignedOut,
  storeUserSignedIn,
  addNotificationError
} from "./actions";

function* helloSaga() {
  console.log("Hello Saga!");
}

function* sagaGetTopCourses() {
  const topCourses = yield call(getTopPopularCoursesWithSaga);
  yield put(storeTopCourses(topCourses));
}

function* watchGetTopCourses() {
  yield takeLeading(actionTypes.GET_TOP_COURSES, sagaGetTopCourses);
}

function* sagaUserVerify() {
  const resp = yield call(verifyUserToken);
  if (resp.ok) {
    yield put(storeUserVerify(resp.data));
  } else {
    yield put(storeUserSignedOut());
  }
}

function* watchMakeUserVerify() {
  yield takeLeading(actionTypes.MAKE_USER_VERIFY, sagaUserVerify);
}

function* sagaRequestUserSignIn() {
  const resp = yield take(actionTypes.REQUEST_USER_SIGN_IN);
  console.log("IN sign in request saga with data : ", resp);
  const data = resp.data;
  if (data.ok) {
    yield put(storeUserSignedIn(data.data));
  } else {
    console.log("Error !! storing the error", data);
    yield put(addNotificationError(data));
  }
}

export default function* adSaga() {
  yield all([
    helloSaga(),
    watchGetTopCourses(),
    watchMakeUserVerify(),
    sagaRequestUserSignIn()
  ]);
}
