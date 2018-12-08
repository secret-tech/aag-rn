import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Image } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { closeNotification, purgeAdvisor, submitReview } from '../../../redux/ducks/common/review';

import s from './styles';


class ReviewAdvisor extends Component {
  state = {
    rating: 0
  }

  componentWillMount() {
    this.props.closeNotification();
  }

  nav = (id, routeName, params) => {
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });
  }

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
    const { id } = this.props.advisor.toJS();
    const { rating } = this.state;

    this.props.submitReview({ id, rating });
    this.nav('Explore', 'ExploreExplore');
    this.props.purgeAdvisor();
  }

  render() {
    const { firstName, picture } = this.props.advisor.toJS();

    return (
      <Container style={s.container}>
        <Content>
          <View style={s.wrap}>
            <Button style={s.close} transparent onPress={() => this.nav('Explore', 'ExploreExplore')}>
              <Icon name='arrow-left' size={24} color='#fff'/>
            </Button>
            
            <View style={s.picWrap}>
              <Image style={s.pic} source={{ uri: picture }} resizeMode="cover" />
            </View>

            <View style={s.textWrap}>
              <Text style={s.ttl}>Send feedback for {firstName}!</Text>

              <Text style={s.descr}>You recently spoke with {firstName}, please leave your feedback about the service provided.</Text>
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
                <Text style={s.buttonText}>RATE</Text>
              </Button>
            </View>

          </View>
        </Content>
      </Container>
    );
  }
}


export default connect(
  (state) => ({
    advisor: state.common.review.get('advisor')
  }),
  {
    closeNotification,
    purgeAdvisor,
    submitReview
  }
)(withNavigation(ReviewAdvisor));
