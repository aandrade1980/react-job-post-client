import React, { Component } from 'react';
import styled from 'styled-components';

// Redux
import { connect } from 'react-redux';
import { reOrderJobs } from '../redux/actions/jobActions';

// Material UI
import Button from '@material-ui/core/Button';

// Components
import JobCard from './JobCard';
import ModalContainer from './Modal';
import Spinner from './Spinner';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.checkPosition = this.checkPosition.bind(this);
  }

  state = {
    draggedItem: {},
    draggedOverItem: {},
    jobImageSpans: [],
    showMore: false,
    showMoreBtnClass: 'hideMore-btn'
  };

  componentDidMount() {
    window.addEventListener('scroll', this.checkPosition);
  }

  componentWillUnmount() {
    this.removeScrollEvent();
  }

  removeScrollEvent() {
    window.removeEventListener('scroll', this.checkPosition);
  }

  checkPosition() {
    const yPosition = window.scrollY;
    if (yPosition > 600) {
      this.setState({ showMoreBtnClass: 'showMore-btn' });
      this.removeScrollEvent();
    }
  }

  setDraggedItem = draggedItem => this.setState({ draggedItem });

  onDragOver = (evt, job, position) => {
    evt.preventDefault();
    this.setState({ draggedOverItem: job });
    this.props.reOrderJobs(this.state, position);
  };

  setSpans = jobIdSpans =>
    this.setState({ jobImageSpans: [...this.state.jobImageSpans, jobIdSpans] });

  getJobImageSpans = jobId => {
    const spans = this.state.jobImageSpans.find(job =>
      Object.keys(job).includes(jobId)
    );

    return spans && spans[jobId];
  };

  showMoreJobs = () => this.setState({ showMore: true });

  render() {
    const { filteredJobs } = this.props;
    const numberOfJobs = this.state.showMore ? filteredJobs.length : 10;
    return (
      <section style={styles.section}>
        <Ul>
          {filteredJobs ? (
            filteredJobs.slice(0, numberOfJobs).map((job, index) => {
              return (
                <li
                  style={{
                    gridRowEnd: `span ${this.getJobImageSpans(job.jobId)}`
                  }}
                  key={job.jobId}
                  onDragOver={evt => this.onDragOver(evt, job, index)}
                >
                  <JobCard
                    key={job.jobId}
                    job={job}
                    setDraggedItem={this.setDraggedItem}
                    setSpans={this.setSpans}
                  />
                </li>
              );
            })
          ) : (
            <ModalContainer>
              <Spinner />
            </ModalContainer>
          )}
        </Ul>
        <ShowMoreDiv>
          {filteredJobs && !this.state.showMore && (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={this.showMoreJobs}
              className={this.state.showMoreBtnClass}
            >
              Show More
            </Button>
          )}
        </ShowMoreDiv>
      </section>
    );
  }
}

const Ul = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 0 10px;
  grid-auto-rows: 80px;
  justify-items: center;
  margin: 0;
  padding: 15px 30px;
  @media only screen and (max-device-width: 667px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const ShowMoreDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 25px;
  .showMore-btn {
    display: block;
  }
  .hideMore-btn {
    display: none;
  }
`;

const styles = {
  section: {
    backgroundColor: '#f3f3f3'
  }
};

const mapStateToProps = ({ job: { filteredJobs } }) => ({
  filteredJobs
});

const mapActionsToProps = {
  reOrderJobs
};

export default connect(mapStateToProps, mapActionsToProps)(Jobs);
