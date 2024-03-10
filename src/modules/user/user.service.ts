import { escapeRegex } from '../../lib/utils/regex';
import { bookTime } from '../../shared/bookTime';
import { getAvailableTimes } from '../../shared/getAvailableTime';
import IUser, { IUserQuery } from './user.interface';
import User from './user.model';

const userService = {
  create: async (user: IUser) => {
    return User.create(user);
  },
  get: async (query?: IUserQuery) => {
    if (query?.name) {
      const regex = new RegExp(escapeRegex(query?.name), 'gi');
      query.name = regex;
      return User.find({ name: query.name });
    }
    return User.find();
  },
  getById: async (id: string) => {
    return User.findById(id);
  },
  updateById: async (id: string, data: any) => {
    return User.findByIdAndUpdate(id, data, { new: true });
  },
  deleteById: async (id: string) => {
    return User.findByIdAndDelete(id);
  },

  test: async () => {
    // Student Configuration
    const dayStartTime = '09:00';
    const dayEndTime = '22:00';
    // const lunchTime = {
    //   time: '13:00',
    //   duration: 60
    // }

    const tasks = [
      { name: 'Task_1', priority: 1, duration: 1, day: 0 },
      { name: 'Task_2', priority: 4, duration: 2, day: 0 },
      { name: 'Task_3', priority: 3, duration: 1, day: 0 },
    ];

    let classes = [
      { day: 0, name: 'Math', startTime: '10:00', endTime: '11:00' },
      { day: 0, name: 'Physics', startTime: '11:00', endTime: '13:00' },
    ];

    let partTimeJobHours = [
      { day: 0, duration: 4 },
      { day: 1, duration: 4 },
    ];

    const generateStudyPlan = (
      dayStartTime,
      dayEndTime,
      // lunchTime,
      tasks,
      classes,
      partTimeJobHours
    ) => {
      const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const schedule: any = {};

      weekDays.map((weekDay, index) => {
        const classTime: any[] = classes.filter((c) => c.day === index) || [];
        const partTimeJob = partTimeJobHours.find((p) => p.day === index);

        const weekDayTasks: any[] = tasks.filter((t) => t.day === index) || [];

        const studyPlan = {
          day: weekDay,
          dayStartTime,
          dayEndTime,
          classTime,
          partTimeJob,
          weekDayTasks,
        };

        const bookedTime =
          classTime.map((c) => {
            return {
              startTime: c.startTime,
              endTime: c.endTime,
            };
          }) || [];

        const availableTimes = getAvailableTimes(dayStartTime, dayEndTime, bookedTime || []);

        if (partTimeJob) {
          const jobBookTime = bookTime(partTimeJob.duration * 60, availableTimes);
          bookedTime.push(jobBookTime);
          partTimeJob.startTime = jobBookTime.startTime;
          partTimeJob.endTime = jobBookTime.endTime;
        }

        if (weekDayTasks?.length) {
          weekDayTasks.sort((a, b) => b.priority - a.priority);
          weekDayTasks.map((task) => {
            const taskBookTime = bookTime(task.duration * 60, availableTimes);
            bookedTime.push(taskBookTime);
            task.startTime = taskBookTime.startTime;
            task.endTime = taskBookTime.endTime;
          });
        }
        schedule[weekDay] = studyPlan;
      });
      return schedule;
    };

    return generateStudyPlan(dayStartTime, dayEndTime, tasks, classes, partTimeJobHours);
  },
};

export default userService;
