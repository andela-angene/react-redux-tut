import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [{ title: 'a' }, { title: 'b' }];
    const newCourse = { title: 'c' };
    const action = actions.createCourseSuccess(newCourse);

    const newState = courseReducer(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('a');
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    const initialState = [
      { id: '1', title: 'a' },
      { id: '2', title: 'b' },
      { id: '3', title: 'c' }
    ];
    const course = { id: '2', title: 'New title' };
    const action = actions.updateCourseSuccess(course);

    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(item => item.id === course.id);
    const untouchedCourse = newState.find(item => item.id === '1');

    expect(updatedCourse.title).toEqual('New title');
    expect(untouchedCourse.title).toEqual('a');
    expect(newState.length).toEqual(3);
  });
});
