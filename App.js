import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  ListView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';

export default class App extends React.Component {
  state = {
    items: [],
    item: ''
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

  constructor() {
    super();
    AsyncStorage.getItem('items')
      .then(itemsJSON => {
        if(itemsJSON) {
          this.setState({
            items: JSON.parse(itemsJSON)
          })
        }
      })
  }

  onChangeText = text => {
    this.setState({
      item: text
    })
  }
  onNewItem = e => {
    const arr = [this.state.item, ...this.state.items];
    this.setState({
      items: arr,
      item: ''
    })
    this.save(arr);
  }

  save = (arr) => {
    AsyncStorage.setItem('items', JSON.stringify(arr))
  }


  renderRow = (rowData, sectionID, rowID) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText} >{rowData}</Text>
        <TouchableOpacity style={styles.deleteButton}
          onPress={()=> {
            this.state.items.splice(rowID, 1)
            this.setState({
              items: [...this.state.items]
            })
            this.save(this.state.items);
          }}>
          <Text>delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {

    return (
        <ScrollView style={styles.ScrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🍕</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onSubmitEditing={this.onNewItem}
          placeholder='Make a new quest'
          returnKeyType="done"
          onChangeText={this.onChangeText}
          value={this.state.item}
          />
        <ListView
          dataSource={this.ds.cloneWithRows(this.state.items)}
          renderRow={this.renderRow}
          enableEmptySections
          />
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    padding: 10,
    paddingTop: 30,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50
  },
  ScrollViewContainer: {
       backgroundColor: '#fff'
   },
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    flex: 1,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'steelblue',
    borderRadius: 10,
  },
});



//
// import React from 'react';
// import { StyleSheet, Text, View, AppRegistry, Image, TextInput, ScrollView, Button, Alert  } from 'react-native';
//
// export default class App extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = {text: ''};
//     }
//     _onPress() {
//   Alert.alert('on Press!');
//     var inputData = {this.state.text};
//  }
//
//   render() {
//     return (
//       <ScrollView style={styles.ScrollViewContainer}>
//      <View  style={styles.container}>
//       <View style={{padding: 10}}>
//       <TextInput
//         style={styles.textInputContainer}
//         placeholder="Type here to macke a note!)"
//         onChangeText={(text) => this.setState({text})}
//       />
//       <View style={styles.buttonContainer}>
//           <Button onPress={this._onPress} title="Hello" color="#FFFFFF" accessibilityLabel="Tap on Me"/>
//         </View>
//       <Text style={{padding: 10, fontSize: 42}}>
//
//       </Text>
//     </View>
//     <Text style={{fontSize:96 }}>🍕</Text>
//      </View>
//      </ScrollView>
//     );
//   }
// }
//
//
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'steelblue',
//     //backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textInputContainer: {
//     height: 40
//   },
//   ScrollViewContainer: {
//     backgroundColor: 'steelblue'
//   },
//   buttonContainer: {
//     backgroundColor: '#2E9298',
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: '#000000',
//     },
// });



//
// import React from 'react';
// import { StyleSheet, Text, View, AppRegistry, Image, TextInput  } from 'react-native';
//
// export default class App extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = {text: ''};
//     }
//   render() {
//     return (
//       // <View  style={styles.containerNext}>
//       //  <Text>Hello World</Text>
//       // </View>
//       <View style={{padding: 10}}>
//       <TextInput
//         style={{height: 40}}
//         placeholder="Type here to translate!"
//         onChangeText={(text) => this.setState({text})}
//       />
//       <Text style={{padding: 10, fontSize: 42}}>
//         {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
//       </Text>
//     </View>
//     );
//   }
// }
// AppRegistry.registerComponent('PizzaTranslator', () => PizzaTranslator);
//
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'steelblue',
//     //backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });



// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Hello World</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// import React, { Component } from 'react';
// import { AppRegistry, Text } from 'react-native';
//
// class HelloWorldApp extends Component {
//   render() {
//     return (
//       <Text>Hello world!</Text>
//     );
//   }
// }
//
// AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
