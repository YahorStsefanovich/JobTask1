
function Computer(processorType, coresCount, frequency, bitDepth) {
    this._processorType = processorType;
    this._coresCount = coresCount;
    this._frequency = frequency;
    this._bitDepth = bitDepth;

    //save context
    let that = this;

    this.getBitDepth = function () {
        return that._bitDepth;
    };
    this.setBitDepth = function (value) {
        that._bitDepth = value;
    };

    this.getFrequency = function () {
        return that._frequency;
    };
    this.setFrequency = function (value) {
        that._frequency = value;
    };

    this.getCoresCount = function () {
        return that._coresCount;
    };
    this.setCoresCount = function (value) {
        that._coresCount = value;
    };

    this.getProcessorType = function () {
        return that._processorType;
    };
    this.setProcessorType = function (value) {
        that._processorType = value;
    }
}

function Ultrabook(processorType, coresCount, frequency, bitDepth, graphicsCard, ramSize) {
    Computer.apply(this, [processorType, coresCount, frequency, bitDepth]);

    let that = this;

    this._graphicsCard = graphicsCard;
    this._ramSize = ramSize;

    this.getGraphicsCard = function () {
        return that._graphicsCard;
    };
    this.setGraphicsCard = function (value) {
        that._graphicsCard = value;
    };

    this.getRamSize = function () {
        return that._ramSize;
    };
    this.setRamSize = function (value) {
        that._ramSize = value;
    }
}

function ComputingServer(processorType, coresCount, frequency, bitDepth, isHiperThreading, hddSize) {
    Computer.apply(this, [processorType, coresCount, frequency, bitDepth]);

    this._isHiperThreading = isHiperThreading;
    this._hddSize = hddSize;

    let that = this;

    this.hasHiperThreading = function () {
        return that._isHiperThreading;
    };
    this.setHiperThreading = function (value) {
        that._isHiperThreading = value;
    };

    this.getHddSize = function () {
        return that._hddSize;
    };
    this.setHddSize = function (value) {
        that._hddSize = value;
    }
}

Computer.prototype.doSmthng = function () {
    console.log("Computer frequency" + this.frequency);
};

Ultrabook.prototype.doSmthng = function () {
    Computer.prototype.doSmthng.apply(this);
    console.log("Ultrabook frequency");
};

ComputingServer.prototype.doSmthng = function () {
    console.log("ComputingServer frequency");
};

let computer = new Computer("Intell core i7", 4, '2.3GHz', 64);
console.log(computer);

let ultrabook = new Ultrabook("Intell core i7", 4, '2.3GHz', 64, "NVIDIA GForce 1080 Ti", "16GB");
console.log(ultrabook);
ultrabook.doSmthng();

let computingServer = new ComputingServer("Intell core i7", 4, '2.3GHz', 64, true, "1000GB");
console.log(computingServer);
computingServer.doSmthng();

function serialize(obj) {
    return JSON.stringify(obj);
}

function deserialize(type, jsonValue) {
    return JSON.stringify(jsonValue);
}

