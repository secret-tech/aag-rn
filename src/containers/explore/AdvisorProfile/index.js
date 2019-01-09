import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StatusBar, Dimensions, Text, View, Image } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { reqFindOrCreateConversation } from '../../../redux/ducks/chat/chat';

import s from './styles';

export const WS = Dimensions.get('window');
export const sliderWidth = WS.width;
export const largeSlideWidth = WS.width;


class AdvisorProfile extends Component {
  state = {
    activeSlide: 0
  }

  capitalize = (string) => string && string.charAt(0).toUpperCase() + string.slice(1);

  itemRenderer = (picture) => {
    return (
      <View style={{ ...s.pictureWrapper, height: largeSlideWidth, width: largeSlideWidth }}>
        <Image style={s.picture} source={{ uri: picture.item }} resizeMode="cover" />
        <View style={s.pictureFrontdrop}/>
      </View>
    );
  }

  render() {
    const {
      id,
      age,
      picture,
      pictures,
      firstName,
      bio,
      gender,
      tags,
      rating
    } = this.props.navigation.state.params;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Container style={s.container}>
          <Content>
            <View style={s.carousel}>
              <Button transparent style={s.back} onPress={() => this.props.navigation.goBack()}>
                <Icon type="SimpleLineIcons" name="arrow-left" style={{ fontSize: 20, color: '#fff' }}/>
              </Button>

              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={[picture, ...pictures]}
                renderItem={this.itemRenderer}
                sliderWidth={sliderWidth}
                itemWidth={largeSlideWidth}
                onSnapToItem={(activeSlide) => this.setState({ activeSlide })}/>

              <View style={s.paginationWrapper}>
                <Pagination
                  dotsLength={[picture, ...pictures].length}
                  activeDotIndex={this.state.activeSlide}
                  dotStyle={s.dotStyle}
                  inactiveDotOpacity={0.5}
                  inactiveDotScale={0.7}/>
              </View>

              <Button transparent style={s.connect} onPress={() => this.props.reqFindOrCreateConversation(id)}>
                <Icon type="SimpleLineIcons" name="bubbles" style={{ fontSize: 24, color: '#fff', padding: 0, margin: 0 }}/>
              </Button>
            </View>

            <View style={s.info}>
              <Text style={s.name}>{firstName}</Text>
              <Text style={s.gender}>{this.capitalize(gender)} {age && `, ${age}`}</Text>
              {rating > 0
                ? (
                  <View style={s.ratioWrap}>
                    <Icon type="FontAwesome" name="star" style={{ fontSize: 16, color: '#e3b23c' }}/>
                    <Text style={s.ratio}>{rating}</Text>
                  </View>
                )
                : null}
            </View>

            <View style={s.bioWrap}>
              <Text style={s.bio}>{bio}</Text>
            </View>

            <View style={s.tags}>
              {tags.map((tag, i) => <Text style={s.tag} key={`${tag}-${i}`}>{tag}</Text>)}
            </View>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default connect(
  null,
  {
    reqFindOrCreateConversation
  }
)(AdvisorProfile);
