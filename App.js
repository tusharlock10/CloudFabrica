import React from 'react';
import { FlatList } from 'react-native';
import {View, Text} from 'react-native'
import {SearchBar, Avatar, Header, Overlay, Input, Button} from 'react-native-elements'


// Import getNews function from news.js
import { getNews } from './src/news';
// We'll get to this one later
import Article from './src/components/article';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true, search:'', allArticles:[], avatar:"", 
  isVisible:false, nameInput:"" };
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchNews();
   }

  getInitials(name){
    var initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials
  }
  
  updateSearch = (search) => {
    var temp =[];
    this.state.allArticles.forEach(
      (article) => {
        if (!article.description){
          article.description=''
        }
        if (!article.title){
          article.title=''
        }
        
        if (article.title.includes(search) || article.description.includes(search)){
          temp.push(article);
        }
      }
    )

    this.setState({ search, articles:temp });
  };

  showModal(){
    this.setState({isVisible:true})

  }

  displayTitle(){
    if (this.state.avatar===""){
      return (
      
        <Avatar rounded icon={{name: 'user', type: 'font-awesome'}} showEditButton 
        onPress={this.showModal.bind(this)}/>
      )
    }
    return <Avatar rounded title={this.state.avatar} showEditButton 
              onPress={this.showModal.bind(this)}/>

  }

  clearSearch (){
    this.setState({articles:this.state.allArticles})
  }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ allArticles:articles, refreshing: false, articles }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchNews()
    );
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'rgb(225,232,238)'}}>
        <Header
        statusBarProps = {{backgroundColor:'rgb(32, 137, 220)', translucent:false}}
        containerStyle = {{marginTop:-25}}
        >
          {this.displayTitle()}
          <Text style={{fontSize:22, color:"rgb(255, 255, 255)", fontWeight:'bold'}}>Today's News</Text>

        </Header>
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(50, 50, 50, .9)"
          overlayBackgroundColor="white"
          width="auto"
          animationType='fade'
          height="auto"
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <View style={{width:260, height:100, justifyContent:'space-around', alignItems:'center'}}>
            <Input
              placeholder='Enter your name...'
              inputStyle={{fontSize:16, marginHorizontal:10}}
              leftIcon={{ type: 'font-awesome', name: 'pencil' }}
              onChangeText={(text) => {this.setState({nameInput:text})}}
              value={this.state.nameInput}
              />

            <Button
              title='Enter'
              onPress={()=>this.setState({avatar:this.getInitials(this.state.nameInput), isVisible:false})}
            />
          </View>

        </Overlay>

        <SearchBar
        placeholder="Search news..."
        onChangeText={this.updateSearch.bind(this)}
        value={this.state.search}
        lightTheme
        onClear = {this.clearSearch.bind(this)}
        />

        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => <Article article={item} />}
          keyExtractor={item => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
        />
      </View>
  );
  }
}