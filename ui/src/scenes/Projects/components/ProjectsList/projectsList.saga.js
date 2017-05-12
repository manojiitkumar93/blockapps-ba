import {
  takeLatest,
  put,
  call
} from 'redux-saga/effects';
import {
  API_URL,
  API_MOCK
} from '../../../../environment';
import {
  handleApiError
} from '../../../../lib/apiErrorHandler';
import {
  FETCH_PROJECTS_LIST,
  fetchProjectsListSuccess,
  fetchProjectsListFailure
} from './projectsList.actions';

// TODO: define API endpoint for projects
const url = API_URL + '/projects';


// TODO: move to utils and use it everywhere
function getProjectsMock() {
  return new Promise(function(resolve, reject) {
    resolve(
      [
        {
          id: 132,
          created: '2017-05-09T16:47:49.016Z',
          buyer: 'buyer1',
          name: 'T-Shirts with logo',
          description: 'The T-Shirts with our company\'s logo on the chest, Qty: 50',
          priceDesired: 800.10,
          desiredDeliveryDate: '2017-05-20T16:47:49.016Z',
          deliveryAddress: {
            street: '109 S 5th street',
            city: 'Brooklyn',
            state: 'New York',
            zip: '11249'
          },
          spec: 'Lorem ipsum dolor sit amet, eam molestie singulis referrentur',
          status: 'open',
          deliveredDate: null,
          bids: [
            {
              price: 790,
              planDescription: 'Lorem ipsum dolor sit amet, eam molestie singulis referrentur at, ei malis clita scripta mel. Et qui altera assentior reformidans, cum case augue te. Ius te dicit probatus intellegebat, no minimum molestiae delicatissimi cum. Omnium officiis instructior ne mel, nam id fugit minim interesset.',
              accepted: false
            },
            {
              price: 795,
              planDescription: 'Lorem ipsum dolor sit amet, eam molestie singulis referrentur at, ei malis clita scripta mel. Et qui altera assentior reformidans, cum case augue te. Ius te dicit probatus intellegebat, no minimum molestiae delicatissimi cum. Omnium officiis instructior ne mel, nam id fugit minim interesset.',
              accepted: false
            }
          ]
        },
        {
          id: 1431,
          created: '2017-05-09T16:47:49.016Z',
          buyer: 'buyer2',
          name: 'NY Yankees sleeve',
          description: 'Sleeve with New York Yankees logos all over it',
          priceDesired: 10.2,
          desiredDeliveryDate: '2017-05-17T10:32:01.016Z',
          deliveryAddress: {
            street: '109 South 5th st.',
            city: 'Brooklyn',
            state: 'NY',
            zip: '11249'
          },
          spec: 'Et qui altera assentior reformidans, cum case augue te. Ius te dicit probatus intellegebat, no minimum',
          status: 'closed',
          deliveredDate: '2017-05-18T12:35:00.000Z',
          bids: [
            {
              price: 10.2,
              planDescription: 'Lorem ipsum dolor sit amet, eam molestie singulis referrentur at, ei malis clita scripta mel. Et qui altera assentior reformidans, cum case augue te. Ius te dicit probatus intellegebat, no minimum molestiae delicatissimi cum. Omnium officiis instructior ne mel, nam id fugit minim interesset.',
              accepted: true
            },
            {
              price: 10,
              planDescription: 'Lorem ipsum dolor sit amet, eam molestie singulis referrentur at, ei malis clita scripta mel. Et qui altera assentior reformidans, cum case augue te. Ius te dicit probatus intellegebat, no minimum molestiae delicatissimi cum. Omnium officiis instructior ne mel, nam id fugit minim interesset.',
              accepted: false
            }
          ]
        }
      ]
    );
  });
}

function getProjectsList(listType) {
  if (API_MOCK) {
    return getProjectsMock();
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(handleApiError)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      throw error;
    });
}

function* fetchProjectsList(action) {
  try {
    let projects = yield call(getProjectsList, action.listType);

    yield put(fetchProjectsListSuccess(projects));
  } catch (err) {
    yield put(fetchProjectsListFailure(err.message));
  }
}

export default function* watchFetchProjectsList() {
  yield takeLatest(FETCH_PROJECTS_LIST, fetchProjectsList);
}
