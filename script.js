window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';
 
    // get user location from their browser
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const places = staticLoadPlaces(latitude, longitude);
            //call render places function with the users geo location
            renderPlaces(places);
           
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
 
    console.log(longitude, latitude)
};
 

//load the pokemon into users location with their lat and long
function staticLoadPlaces(latitude, longitude) {
    return [
        {
            name: 'Pokemon',
            location: {
                lat: latitude,
                lng: longitude,
            },
            position: { x: 0, y: 2, z: -10 }
        },
    ];
}
 
// scaling the models
var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.1 0.1 0.1',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 360 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.05 0.05 0.05',
        rotation: '0 360 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 360 0',
        info: 'Dragonite, Lv. 99, HP 1500/1500',
    },
];
 
var modelIndex = 0;
// takes in the model, if there is scale rotation and position then set it. as well as url
function setModel(model, entity, position) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }
    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }
    if (position) {
        entity.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
    }
    entity.setAttribute('gltf-model', model.url);
 
    //set the insutrctions div with the models info
    const div = document.querySelector('.instructions');
    div.innerText = model.info;
}
 
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
 
    //set model entity to the users lat and long
    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
 
        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
 
        setModel(models[modelIndex], model, place.position);
 
        model.setAttribute('animation-mixer', '');
 
        scene.appendChild(model);
    });
 
    // set change button, changes model on click
    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        var entity = document.querySelector('[gps-entity-place]');
        modelIndex++;
        var newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
    });
}