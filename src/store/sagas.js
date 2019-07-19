import {
  call,
  put,
  takeLatest,
  take,
  all,
  takeLeading
} from "redux-saga/effects";
import actionTypes from "./actionTypes";
import { getTopPopularCoursesWithSaga, getCourse } from "../Requests/Courses";
import { verifyUserToken } from "../Requests/Authentication";
import {
  storeTopCourses,
  storeDetailedDraftCourse,
  storeUserVerify,
  storeUserSignedOut,
  storeUserSignedIn,
  addNotificationError,
  fetchDetailedDraftCourse
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
  const data = resp.data;
  if (data.ok) {
    yield put(storeUserSignedIn(data.data));
  } else {
    yield put(addNotificationError(data));
  }
}

function* sagaFetchDetailedDraftCourse(action) {
  const resp = yield call(getCourse, action.data);
  if (resp.ok) {
    yield put(storeDetailedDraftCourse(resp.data));
  } else {
    yield put(addNotificationError(resp));
  }
}

function* watchFetchDetailedDraftCourse() {
  yield takeLatest(
    actionTypes.FETCH_DETAILED_DRAFT_COURSE,
    sagaFetchDetailedDraftCourse
  );
}

function* sagaUpdateDetailedDraftCourse(action) {
  const resp = action.data;
  if (resp.ok) {
    yield put(fetchDetailedDraftCourse(resp.data.id));
  } else {
    yield put(addNotificationError(resp));
  }
}

function* watchUpdateDetailedDraftCourse() {
  yield takeLatest(
    actionTypes.UPDATE_DETAILED_DRAFT_COURSE,
    sagaUpdateDetailedDraftCourse
  );
}

export default function* adSaga() {
  yield all([
    helloSaga(),
    watchGetTopCourses(),
    watchMakeUserVerify(),
    sagaRequestUserSignIn(),
    watchFetchDetailedDraftCourse(),
    watchUpdateDetailedDraftCourse()
  ]);
}
