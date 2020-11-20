import {
  CREATE_LIFT,
  FETCH_LIFTS,
  FETCH_LIFT,
  EDIT_LIFT,
  DELETE_LIFT,
  SIGN_IN,
  SIGN_OUT
} from './types';
import axios from 'axios';

export const createUser = (name, id) => {
  return {
    type: 'CREATE_USER',
    payload: {
      name: name,
      id: id
    }
  };
};



export const createLift = formValues => async (dispatch) => {
  const response = await axios.post("http://localhost:3001/insert", {formValues})
}

