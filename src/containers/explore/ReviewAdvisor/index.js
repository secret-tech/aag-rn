import React, { Component } from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Image } from 'react-native';
import { View, Text, Button } from 'native-base';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import s from './styles';


class ReviewAdvisor extends Component {
  state = {
    rating: 0,
    id: '0x000' // TODO get advisor id from notification
  }

  nav = (id, routeName, params) => 
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });

  getLabel = () => {
    const { rating } = this.state;

    switch (rating) {
      case 1:
        return 'Terrible';
      case 2:
        return 'Bad';
      case 3:
        return 'Okay';
      case 4:
        return 'Good';
      case 5:
        return 'Great';
      default:
        return ' ';
    }
  }

  send = () => {
    console.log('sended rating', this.state);
    this.nav('Explore', 'ExploreExplore');
  }

  render() {
    return (
      <View style={s.container}>
        <Button style={s.close} transparent onPress={() => this.nav('Explore', 'ExploreExplore')}>
          <Icon name='arrow-left' size={24} color='#fff' />
        </Button>
        
        <View style={s.picWrap}>
          <Image style={s.pic} source={{ uri: 'http://66.media.tumblr.com/81a261c7eae63d13f814692007fd6645/tumblr_nymn9jLXbY1qa7cpuo1_1280.jpg' }} resizeMode="cover" />
        </View>

        <View style={s.textWrap}>
          <Text style={s.ttl}>Send feedback for Alice l`Advice!</Text>

          <Text style={s.descr}>You recently spoke with Alice, please leave your feedback about the service provided.</Text>
        </View>

        <View style={s.stars}>
          <View style={s.starsLabel}>
            <Text style={s.starsLabelText}>{this.getLabel()}</Text>
          </View>

          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.rating}
            selectedStar={(rating) => this.setState({ rating })}
            emptyStar="star"
            fullStar="star"
            halfStar="star-half-o"
            iconSet="FontAwesome"
            fullStarColor="#e3b23c"
            emptyStarColor="#ffe8d1"
            starSize={50}
            buttonStyle={{
              marginLeft: 5,
              marginRight: 5
            }}
            containerStyle={{
              marginLeft: -5,
              marginRight: -5
            }}
          />
        </View>

        <View style={s.buttonWrap}>
          <Button transparent block style={s.button} onPress={this.send}>
            <Text style={s.buttonText}>Send</Text>
          </Button>
        </View>

      </View>
    );
  }
}


export default withNavigation(ReviewAdvisor);
