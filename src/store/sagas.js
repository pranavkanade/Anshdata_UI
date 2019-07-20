import {
  call,
  put,
  takeLatest,
  take,
  all,
  takeLeading
} from "redux-saga/effects";
import actionTypes from "./actionTypes";
import {
  getTopPopularCoursesWithSaga,
  getCourse,
  getCoursesList,
  getEnrolledCoursesList
} from "../Requests/Courses";
import { verifyUserToken } from "../Requests/Authentication";
import { enrollEventHandler } from "../Requests/Enrollment";
import {
  storeTopCourses,
  storeDetailedDraftCourse,
  storeUserVerify,
  storeUserSignedOut,
  storeUserSignedIn,
  addNotificationError,
  fetchDetailedDraftCourse,
  storeCourse,
  storeEnrolledCourses,
  storeCatalogCourses,
  fetchUpdatedCourses
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

function* sagaFetchEnrolledCourses() {
  console.log("Will try to get and store enrolled courses");
  const resp = yield call(getEnrolledCoursesList);
  if (resp.ok) {
    console.log("Successfully fetched new courses!", resp.data);
    yield put(storeEnrolledCourses(resp.data));
  } else {
    yield put(addNotificationError(resp));
  }
}

function* watchFetchEnrolledCourses() {
  yield takeLatest(
    actionTypes.FETCH_ENROLLED_COURSES,
    sagaFetchEnrolledCourses
  );
}

function* sagaFetchCatalogCourses() {
  console.log("Will try to get and store enrolled courses");
  const resp = yield call(getCoursesList);
  if (resp.ok) {
    console.log("Successfully fetched new courses!", resp.data);
    yield put(storeCatalogCourses(resp.data));
  } else {
    yield put(addNotificationError(resp));
  }
}

function* watchFetchCatalogCourses() {
  yield takeLatest(actionTypes.FETCH_CATALOG_COURSES, sagaFetchCatalogCourses);
}

function* sagaUpdateCourses() {
  console.log("Will try to fetch catalog and enrolled courses");
  yield all([sagaFetchEnrolledCourses(), sagaFetchCatalogCourses()]);
}

function* watchRequestUpdateCourses() {
  yield takeLatest(actionTypes.FETCH_UPDATED_COURSES, sagaUpdateCourses);
}

function* sagaEnrollToCourse(action) {
  console.log("Will try to enroll to the course : ", action.data);
  const resp = yield call(enrollEventHandler, action.data.id);
  if (resp.ok) {
    console.log("Enrolled Request Successful!");
    yield put(storeCourse(action.data));
    yield put(fetchUpdatedCourses());
  } else {
    yield put(addNotificationError(resp));
  }
}

function* watchEnrollToCourse() {
  yield takeLeading(actionTypes.ENTOLL_TO_COURSE, sagaEnrollToCourse);
}

export default function* adSaga() {
  yield all([
    helloSaga(),
    watchGetTopCourses(),
    watchMakeUserVerify(),
    sagaRequestUserSignIn(),
    watchFetchDetailedDraftCourse(),
    watchUpdateDetailedDraftCourse(),
    watchEnrollToCourse(),
    watchRequestUpdateCourses(),
    watchFetchCatalogCourses(),
    watchFetchEnrolledCourses()
  ]);
}
