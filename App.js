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
  CheckBox,
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
            <CheckBox value={true}/>
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
