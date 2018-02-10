(() => {
    battlemap = L.map('mapcontainer', { crs: L.CRS.Simple });

    battlemap.on('load', function (e) {
        addBattleMarkers()
    });

    yx = L.latLng;

    xy = function (x, y) {
        if (L.Util.isArray(x)) {
            return yx(x[10], x[0]);
        }
        return yx(y, x);
    };

    var bounds = [xy(0, 0), xy(3000, 4242)];
    var image = L.imageOverlay("../SiteAssets/WesterosMap.png", bounds).addTo(battlemap);

    battlemap.setMaxZoom(2)
    battlemap.setMinZoom(-2)
    battlemap.setView(xy(1620, 1450), -2)

    L.Control.MousePosition = L.Control.extend({
        options: {
            position: 'bottomleft',
            separator: ' : ',
            emptyString: 'Unavailable',
            lngFirst: false,
            numDigits: 5,
            lngFormatter: undefined,
            latFormatter: undefined,
            prefix: ""
        },

        onAdd: function (map) {
            this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
            L.DomEvent.disableClickPropagation(this._container);
            map.on('mousemove', this._onMouseMove, this);
            this._container.innerHTML = this.options.emptyString;
            return this._container;
        },

        onRemove: function (map) {
            map.off('mousemove', this._onMouseMove)
        },

        _onMouseMove: function (e) {
            var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
            var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
            var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
            var prefixAndValue = this.options.prefix + ' ' + value;
            this._container.innerHTML = prefixAndValue;
        }

    });

    L.Map.mergeOptions({
        positionControl: false
    });

    L.Map.addInitHook(function () {
        if (this.options.positionControl) {
            this.positionControl = new L.Control.MousePosition();
            this.addControl(this.positionControl);
        }
    });

    L.control.mousePosition = function (options) {
        return new L.Control.MousePosition(options);
    };

    L.control.mousePosition().addTo(battlemap);
})()

function addBattleMarkers() {
    fetch("../_api/web/lists/getbytitle('Battles')/items", { credentials: "include", headers: { "accept": "application/json;odata=verbose" } })
        .then(j => j.json()
            .then(res => res.d.results)
            .then(items => {
                if (items.length) {
                    items.map(b => {
                        L.marker(xy(b.BattleLocationX, b.BattleLocationY))
                            .addTo(battlemap)
                            .bindPopup(`<b>${b.BattleName}</b>
                            <br/>Gold looted: <b>${b.BattleGoldLooted}</b>
                            <br/>XP gained: <b>${b.BattleXPGained}</b>
                            `)
                    })
                }
            }))
}