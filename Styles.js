import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  navigationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingTop: 20,
  },
  modifyButton: {
    backgroundColor: 'blue',
    padding: 4,
    borderRadius: 3,
  },
  searchButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: 'green',
    padding: 2,
    borderRadius: 5,
    alignItems: "flex-end",
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  modifyButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
  textInput: {
    fontSize: 25,
    marginTop: 10,
  },
  searchText: {
    fontSize: 16,
    marginTop: 3,
  },
  balanceText: {
    color: 'gray',
    fontSize: 35,
    letterSpacing: 2,
    marginBottom: 5,
  },
  inputBox: {
    color: 'gray',
    fontSize: 24,
    textAlign: "center",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    color: '#fff',
    fontSize: 24,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "green",
    marginTop: 30,
    marginBottom: 80,
    textAlign: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
  },
});
