import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  takeLeading
} from "redux-saga/effects";
import actionTypes from "./actionTypes";
import { getTopPopularCoursesWithSaga } from "../Requests/Courses";
import { verifyUserToken } from "../Requests/Authentication";
import {
  storeTopCourses,
  storeUserVerify,
  storeUserSignedOut
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
  const data = yield call(verifyUserToken);
  if (data.ok) {
    yield put(storeUserVerify(data));
  } else {
    yield put(storeUserSignedOut());
  }
}

function* watchMakeUserVerify() {
  yield takeLeading(actionTypes.MAKE_USER_VERIFY, sagaUserVerify);
}

export default function* adSaga() {
  yield all([helloSaga(), watchGetTopCourses(), watchMakeUserVerify()]);
}
