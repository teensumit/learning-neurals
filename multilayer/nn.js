function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        this.weight_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weight_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weight_ih.randomize();
        this.weight_ho.randomize();
        this.bais_h = new Matrix(this.hidden_nodes, 1);
        this.bais_o = new Matrix(this.output_nodes, 1);
        this.bais_h.randomize();
        this.bais_o.randomize();
    }
    feedForward(input_arr) {
        // Hidden Outputs
        let inputs = Matrix.fromArray(input_arr);
        let hidden = Matrix.multiply(this.weight_ih, inputs);
        hidden.add(this.bais_h);
        hidden.map(sigmoid);

        // Output Layer
        let outputs = Matrix.multiply(this.weight_ho, hidden);
        outputs.add(this.bais_o);
        outputs.map(sigmoid);
        return outputs.toArray();
    }
    train(inputs_arr, targets) {
        let outputs = this.feedForward(inputs_arr);
        // ERROR = TARGET - OUTPUTS
        // let inputs = Matrix.fromArray(inputs_arr);
        outputs = Matrix.fromArray(outputs);
        targets = Matrix.fromArray(targets);

        let output_error = Matrix.subtract(targets, outputs);

        let who_t = Matrix.transpose(this.weight_ho);
        let hidden_errors = Matrix.multiply(who_t, output_error);

        outputs.print();
        targets.print();
        hidden_errors.print()
    }
} 