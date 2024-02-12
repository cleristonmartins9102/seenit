/* eslint-disable no-unused-vars */
const Enzyme = require('enzyme')
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
Enzyme.configure({ adapter: new Adapter() })
window.google = {
  maps: {
    places: {
      Autocomplete: class {
        addListener () {}
      },
      PlacesService: function () {
        return {
          findPlaceFromQuery: function (req, callback) {
            // eslint-disable-next-line standard/no-callback-literal
            callback([{ geometry: '', name: 'wd18' }], 'OK')
          }
        }
      }
    },
    InfoWindow: function () {},
    Map: function () {
      return {
        setZoom: () => {},
        setCenter: () => {}
      }
    },
    Circle: function () {
      return {
        setCenter: () => {},
        setRadius: () => {}
      }
    },
    Point: function () {},
    Marker: function () {}
  }
}

var localStorageMock = (function () {
  var store = {}
  return {
    getItem: function (key) {
      return store[key]
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    clear: function () {
      store = {}
    },
    removeItem: function (key) {
      delete store[key]
    }
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })
