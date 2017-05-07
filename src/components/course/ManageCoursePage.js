import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  // React lifecycle function called anytime the props changes
  // or when react thinks that props changed
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    const course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course });
  }

  saveCourse(event) {
    this.setState({ saving: true });
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        this.setState({ saving: false });
        toastr.success('Course saved');
        this.context.router.push('/courses');
      })
      .catch((error) => {
        this.setState({ saving: false });
        toastr.error(error);
      });
  }

  render() {
    const { authors } = this.props;
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          allAuthors={authors}
          course={this.state.course}
          errors={this.state.errors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          loading={this.state.saving}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

// Pull in the React Router context so
// router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function mapStateTopProps(state, ownProps) {
  let course =
    { id: '',
      watchHref: '',
      title: '',
      authorId: '',
      length: '',
      category: '' };
  const courseId = ownProps.params.id;
  if (courseId) {
    state.courses.forEach((currentCourse) => {
      if (currentCourse.id === ownProps.params.id) {
        course = currentCourse;
      }
    });
  }

  const formatedAuthors = state.authors.map(author => ({
    value: author.id,
    text: `${author.firstName} ${author.lastName}`
  }));
  return {
    course,
    authors: formatedAuthors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateTopProps, mapDispatchToProps)(ManageCoursePage);
