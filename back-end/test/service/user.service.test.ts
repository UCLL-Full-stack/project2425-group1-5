import { User } from "../../model/User";
import userDb from "../../repository/user.db";
import userService from "../../service/user.service";
import { Role, UserInput } from "../../types";

const user = new User({
    name: "Alice Johnson",
    email: "alice.johnson@hospital.com",
    password: "alice123",
    role: "patient" as Role,
})

let createUserMock: jest.Mock;

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserByName: jest.Mock;
let mockUserDbCreateUser: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserByName = jest.fn();
    mockUserDbCreateUser = jest.fn();

    createUserMock = jest.fn();

    jest.clearAllMocks();
    jest.resetAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given: a request to get all users, when: get all users, then: all the users are displayed.",async() =>{
    const allUsers = [user];

    mockUserDbGetAllUsers.mockReturnValue(allUsers);

    userDb.getAllUsers = mockUserDbGetAllUsers;

    const result = await userService.getAllUsers({role: "admin"});

    expect(mockUserDbGetAllUsers).toHaveBeenCalled(); 
    expect(result).toEqual(allUsers);
});

test('given: a valid name, when: get user by name is called, then: the user is returned', async () => {
    // Given:
    mockUserDbGetUserByName.mockResolvedValue(user);
    userDb.getUserByName = mockUserDbGetUserByName;

    // When:
    const result = await userService.getUserByName("Alice Johnson");

    // Then:
    expect(mockUserDbGetUserByName).toHaveBeenCalledWith({name:"Alice Johnson"}); 
    expect(mockUserDbGetUserByName).toHaveBeenCalledTimes(1); 
    expect(result).toEqual(user);
});


test('Given: an unexisting name, When: get user by name is called, Then: an error is thrown', async () => {
    // Given
    const unexistingName = "unknown";
    mockUserDbGetUserByName.mockRejectedValue(new Error(`User with name: ${unexistingName} does not exist.`));
    userDb.getUserByName = mockUserDbGetUserByName;

    // When & Then
    await expect(userService.getUserByName(unexistingName)).rejects.toThrow(`User with name: ${unexistingName} does not exist.`);
});
test('Given: a valid user, when user is created, then user is created with those values', async () => {
    const input = {
        name: "jasmine",
        email: "jasmine@hospital.com",
        password: "jasmine123",
        role: 'patient' as Role
    };

    const createdUser = new User(input);

    
    mockUserDbGetUserByName.mockResolvedValue(null);
    userDb.getUserByName = mockUserDbGetUserByName;

    createUserMock.mockResolvedValue(createdUser);
    userDb.createUser = createUserMock;

    const result = await userService.createUser(input);

    expect(mockUserDbGetUserByName).toHaveBeenCalledWith({name:"jasmine"});
    expect(createUserMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(createdUser);
});

test('Given: an existing user, when user is created, then an error is thrown', async () => {
    const input = {
        name: "jasmine",
        email: "jasmine@hospital.com",
        password: "jasmine123",
        role: 'patient' as Role
    };

    // Mock the check for existing user to return an existing user (user already exists)
    mockUserDbGetUserByName.mockResolvedValue(user);
    userDb.getUserByName = mockUserDbGetUserByName;

    // When & Then: Expecting an error to be thrown due to the user already existing
    await expect(userService.createUser(input)).rejects.toThrow(`User with username: ${input.name} is already registered.`);
});
