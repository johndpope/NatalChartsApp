import React, { Component } from 'react';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import store from 'react-native-simple-store';
import Chroma from 'chroma-js';

import {
  Alert,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';

import { Link } from 'react-router-native';

import { Header, PlanetNav, SvgImage } from '../components/';
import { PLANET_SORT_ORDER, SIGNS_WITH_INFO, PLANETS_WITH_INFO, HOUSES_WITH_INFO } from '../static';

const styles = StyleSheet.create({
  container: {
    paddingTop: (Platform.OS === 'ios') ? 10 : 0
  },
  title: {
    fontFamily: 'Karla-Regular',
    fontSize: 22,
    marginBottom: 10
  },
  textBlack: {
    color: '#000'
  },
  textWhite: {
    color: '#FFF'
  },
  header: {
    height: 60,
    paddingTop: (Platform.OS === 'ios') ? 10 : 0,
    paddingLeft: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  page: {
    flex: 1,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 100
  },
  textRow: {
    fontFamily: 'Karla-Regular',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10
  },
  textRowBottomOnly: {
    fontFamily: 'Karla-Regular',
    fontSize: 18,
    marginBottom: 10
  },
  textRowSmall: {
    fontFamily: 'Karla-Regular',
    fontSize: 18,
    marginBottom: 5
  },
  textSection: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  mainSection: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  section: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  headerText: {
    fontFamily: 'Karla-Regular',
    fontSize: 15,
    textAlign: 'center',
    margin: 5
  },
  row: {
    marginTop: 10,
    marginBottom: 10
  },
  setupButton: {
    marginTop: 10
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
});

const Title = ({children, useWhiteText, ...props}) => (
  <Text style={[styles.title, useWhiteText ? styles.textWhite : styles.textBlack]}>{children}</Text>
);

const Row = ({children, useWhiteText, ...props}) => (
  <Text style={[styles.textRow, useWhiteText ? styles.textWhite : styles.textBlack]}>{children}</Text>
);

const ShortRow = ({children, useWhiteText, ...props}) => (
  <Text style={[styles.textRowSmall, useWhiteText ? styles.textWhite : styles.textBlack]}>{children}</Text>
);

const TopRow = ({children, useWhiteText,  ...props}) => (
  <Text style={[styles.textRowBottomOnly, useWhiteText ? styles.textWhite : styles.textBlack]}>{children}</Text>
);

const AppLink = ({children, to, ...props}) => (
  <Link to={to} component={TouchableOpacity}>
    {children}
  </Link>
);

const PageHeader = ({planetName, planet, sign, signName, backgroundColor, ...props}) => {
  let whiteText = isReadable(backgroundColor, '#FFF') ? true : false;

  return (
    <View style={styles.center}>
      <AppLink to={`/planet/${planetName}`}>
        <View>
          <Title useWhiteText={whiteText}>{planetName}</Title>
        </View>
      </AppLink>
      {planet.icon &&
        <AppLink to={`/planet/${planetName}`}>
          <View>
            <SvgImage styles={styles.textWhite} width="80" height="80" source={{uri: planet.icon}} />
          </View>
        </AppLink>
      }
      <AppLink to={`/sign/${signName}`}>
        <View><Row useWhiteText={whiteText}>{signName}</Row></View>
      </AppLink>
      <AppLink to={`/sign/${signName}`}>
        <View><SvgImage style={styles.row} width="60" height="60" source={{uri: sign.icon}} /></View>
      </AppLink>
    </View>
  )
};

const SignInfo = ({signName, sign, planetName, planet, backgroundColor, ...props}) => {
  let whiteText = isReadable(backgroundColor, '#FFF') ? true : false;

  return (
    <View style={styles.mainSection}>
      <Row useWhiteText={whiteText}>{planetName}, {planet.title}, in {signName}, {sign.title}.</Row>
      <Row useWhiteText={whiteText}>{planet.description} A few lines about {planetName} in {signName} should go here. Personality traits, ways to spot one in the wild, some advice, maybe?</Row>
    </View>
  )
};

const HouseInfo = ({houseName, house, planetName, backgroundColor, ...props}) => {
  let whiteText = isReadable(backgroundColor, '#FFF') ? true : false;

  return (
    <View style={styles.section}>
      <AppLink to={`/house/${houseName}`}>
        <View>
          <ShortRow useWhiteText={whiteText}>{planetName} in {house.title}.</ShortRow>
          <ShortRow useWhiteText={whiteText}>{house.title}: {house.description}</ShortRow>
        </View>
      </AppLink>
    </View>
  )
};

const AspectRow = ({aspect, useWhiteText, ...props}) => {
  let firstName = aspect.first === "Asc" ? "Ascendant" : aspect.first;
  let secondName = aspect.second === "Asc" ? "Ascendant" : aspect.second;
  let aspectType = aspect.type_name;
  let orb = aspect.orb.toFixed(2);

  return (
    <ShortRow useWhiteText={useWhiteText}>{firstName} {aspectType} {secondName} ({orb}°)</ShortRow>
  )
};

const AspectInfo = ({aspects, backgroundColor, ...props}) => {
  if (!aspects) { return <View />; }
  
  let whiteText = isReadable(backgroundColor, '#FFF') ? true : false;

  return (
    <View style={styles.section}>
      <TopRow useWhiteText={whiteText}>Aspects</TopRow>
      {aspects.map((aspect, key) => {
        return (
          <AspectRow key={key} aspect={aspect} useWhiteText={whiteText} />
        )
      })}
    </View>
  )
};

const isReadable = (backgroundColor, textColor) => {
  return Chroma.contrast(backgroundColor, textColor) > 4.5 ? true : false;
}

export default class ListingView extends Component {
  static propTypes = {
    showSidebar: React.PropTypes.func,
    chart: React.PropTypes.object,
    person: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      chart: props.chart,
      person: props.person,
      pages: [],
      index: 0
    };

    this.generatePages = this.generatePages.bind(this);
    this.loadChart = this.loadChart.bind(this);

    this.onNewPage = this.onNewPage.bind(this);
    this.onNavLeft = this.onNavLeft.bind(this);
    this.onNavRight = this.onNavRight.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onEditChartPress = this.onEditChartPress.bind(this);
  }

  componentWillMount() {
    if (this.props.match) {
      this.loadChart(this.props.match.params.name);
    } else {
      this.generatePages();
    }
  }

  generatePages() {
    var pages = [];
    for (var i = 0; i < PLANET_SORT_ORDER.length; i++) {
      let key = PLANET_SORT_ORDER[i];
      pages.push({name: key, val: this.state.chart.planets[key]});
    }

    this.setState({pages});
  }

  loadChart(name) {
    var item = null;

    store.get('savedCharts')
      .then((res) => {
        let item = null;
        for(var i = 0; i < res.length; i++) {
          if (res[i].person.name === name) {
            item = res[i];
            break;
          }
        }

        if (item) {
          this.setState({chart: item.chart, person: item.person});
          this.generatePages();
        }
      })
      .catch((error) => console.log(error));
  }

  renderPage(page) {
    let planet = page.val.planet;
    let sign = SIGNS_WITH_INFO[planet.sign];
    let planetInfo = PLANETS_WITH_INFO[page.name];
    let houseInfo = HOUSES_WITH_INFO[page.val.house];
    let backgroundColor = sign.startColor;
    
    return (
      <ScrollView key={page.name}>
        <View style={styles.page}>
          <PageHeader planetName={page.name} planet={planetInfo} sign={sign} signName={planet.sign} backgroundColor={backgroundColor} />
          <SignInfo planetName={page.name} planet={planetInfo} signName={planet.sign} sign={sign} backgroundColor={backgroundColor} />
          <HouseInfo planetName={page.name} house={houseInfo} houseName={page.val.house} backgroundColor={backgroundColor} />
          <AspectInfo aspects={page.val.aspects} backgroundColor={backgroundColor} />
        </View>
      </ScrollView>
    )
  }
  
  getColorsForPage(page) {
    let sign = SIGNS_WITH_INFO[page.val.planet.sign];
    return [sign.startColor, sign.endColor];
  }
  
  onBackPress() {
    if (this.props.showSidebar) {
      this.props.showSidebar();
    } else {
      this.props.history.goBack();
    }
  }

  onEditChartPress() {
    Alert.alert('#TODO: Edit chart');
  }

  onNewPage(e, state, context) {
    this.setState({index: state.index});
  }

  onNavLeft() {
    this._swiper.scrollBy(-1);
  }

  onNavRight() {
    this._swiper.scrollBy(1);
  }

  render() {
    if (this.state.pages.length === 0) {
      return (<View />)
    }

    const person = this.state.person;
    let birthtime = moment.unix(person.birthdate).utc().format("MMMM Do YYYY, h:mm a");

    let pages = this.state.pages.map((page, key) => this.renderPage(page));
    let colorValues = this.state.pages.map((page, key) => this.getColorsForPage(page));
    let colors = colorValues[this.state.index];
    let useWhiteText = isReadable(colors[0], '#FFF');

    let leftText = this.props.match == null ? '☰ Menu' : null;
    let rightText = this.props.match == null ? null : 'Edit';

    return (
      <LinearGradient colors={colors} style={styles.container}>
        <Header
          leftText={leftText}
          onBackPress={this.onBackPress}
          rightText={rightText}
          onRightPress={this.onEditChartPress} />
        {this.state.pages && 
          <Swiper ref={c => this._swiper = c}
            showsButtons
            onMomentumScrollEnd={this.onNewPage}>
            {pages}
          </Swiper>
        }
      </LinearGradient>
    )
  }
}