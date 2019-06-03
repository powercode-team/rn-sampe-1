const THREAD_COPY_CREATED = {
  type: 'thread_copy_created',
  message: 'This chat is created because {username} is currently on vacation',
};

const MASTER_GOES_VACATION = {
  type: 'master_goes_vacation',
  message: '{username} has gone for vacation',
};

export default {
  THREAD_COPY_CREATED,
  MASTER_GOES_VACATION,
};
