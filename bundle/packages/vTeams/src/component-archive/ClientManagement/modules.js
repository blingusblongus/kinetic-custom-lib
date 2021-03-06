export const projects = [
  {
    name: 'IT Portal Project',
    client: 'Hazelden',
    overallTime: 136,
    timeLeft: 43,
    countOpen() {
      return this.tickets.filter(({ status }) => status === 'open').length;
    },
    tickets: [
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Eric N.',
        id: 320401,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Noah B.',
        id: 320415,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 2,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Daniel H.',
        id: 593592,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Matthew H.',
        id: 249495,
      },
    ],
  },
  {
    name: 'Portal Project',
    client: 'Hazelden',
    overallTime: 400,
    timeLeft: 234,
    countOpen() {
      return this.tickets.filter(({ status }) => status === 'open').length;
    },
    tickets: [
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Eric N.',
        id: 320401,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Noah B.',
        id: 320415,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 2,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Daniel H.',
        id: 593592,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Matthew H.',
        id: 249495,
      },
    ],
  },
  {
    name: 'UI Builder Project',
    client: 'Hazelden',
    overallTime: 400,
    timeLeft: 234,
    countOpen() {
      return this.tickets.filter(({ status }) => status === 'open').length;
    },
    tickets: [
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Eric N.',
        id: 320401,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Noah B.',
        id: 320415,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 2,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Daniel H.',
        id: 593592,
      },
      {
        status: 'open',
        date: new Date(),
        priority: 3,
        shortDescription: 'Lorem Ipsum',
        ticketOwner: null,
        assignedTo: 'Matthew H.',
        id: 249495,
      },
    ],
  },
];
