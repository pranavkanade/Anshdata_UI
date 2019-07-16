import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import actionTypes from "./actionTypes";
import { getTopPopularCoursesWithSaga } from "../Requests/Courses";
import { storeTopCourses } from "./actions";

function* helloSaga() {
  console.log("Hello Saga!");
}

function* sagaGetTopCourses() {
  const topCourses = yield call(getTopPopularCoursesWithSaga);
  yield put(storeTopCourses(topCourses));
}

function* watchGetTopCourses() {
  yield takeLatest(actionTypes.GET_TOP_COURSES, sagaGetTopCourses);
}

export default function* adSaga() {
  yield all([helloSaga(), watchGetTopCourses()]);
}
