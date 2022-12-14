class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for (let i = 0; i < rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }
    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.floor(Math.random() * 2 - 1);
            }
        }
    }
    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }
    multiply(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n;
                }
            }
        }
    }

    static transpose(m1) {
        let result = new Matrix(m1.cols, m1.rows);
        for (let i = 0; i < m1.rows; i++) {
            for (let j = 0; j < m1.cols; j++) {
                result.data[j][i] = m1.data[i][j];
            }
        }
        return result;
    }
    static multiply(m1, m2) {
        if (m1.cols != m2.rows) {
            console.log("Columns of A must be Rows of B")
            return undefined;
        }
        let a = m1.data;
        let b = m2.data;
        let result = new Matrix(m1.rows, m2.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0;
                for (let k = 0; k < m1.cols; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }
    static subtract(m1, m2) {
        if (m1.rows != m2.rows || m1.cols != m2.cols) {
            console.log(m1, m2);
            console.log("Columns & Rows of A must be Rows of B")
            return undefined;
        }
        let result = new Matrix(m1.rows, m1.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                result.data[i][j] = m1.data[i][j] - m2.data[i][j];
            }
        }
        return result;
    }
    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = func(this.data[i][j]);
            }
        }
    }
    static map(m1, func) {
        let result = new Matrix(m1.rows, m1.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                result.data[i][j] = func(m1.data[i][j]);
            }
        }
        return result;
    }
    print() {
        console.table(this.data);
    }
}
