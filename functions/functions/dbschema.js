let db = {
  user: [
    {
      userId: "e3uHopk8aBYyI39rHbjDbDJBsV02",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/social-kof.appspot.com/o/91284134443.jpg?alt=media",
      handle: "new user 1",
      email: "newUser1@gmail.com",
      createdAt: "2020-02-12T15:49:14.340Z",
      bio: "Hello World, my name is Bang",
      website: "http://google.com",
      location: "Ha Noi, Viet Nam",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2020-02-10T16:25:00.735Z",
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "HrWFnamFMDKAfqM49jcK",
      body: "nice one master!",
      createdAt: "2020-02-10T16:25:00.735Z",
    },
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "HrWFnamFMDKAfqM49jcK",
      type: "like | comment",
      createdAt: "2020-02-10T16:25:00.735Z",
    },
  ],
};

const userDetails = {
  credentials: {
    userId: "e3uHopk8aBYyI39rHbjDbDJBsV02",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/social-kof.appspot.com/o/91284134443.jpg?alt=media",
    handle: "new user 1",
    email: "newUser1@gmail.com",
    createdAt: "2020-02-12T15:49:14.340Z",
    bio: "Hello World, my name is Bang",
    website: "http://google.com",
    location: "Ha Noi, Viet Nam",
  },
  likes: [
    { userHandle: "user", screamId: "HrWFnamFMDKAfqM49jcK" },
    { userHandle: "user 1", screamId: "YwXWLnw8OeUc2eUG2C2E" },
  ],
};
