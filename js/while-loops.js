import { BaseJavaCstVisitorWithDefaults } from "java-parser";
import { getLeafNodes } from "./util.js";

class WhileLoopCollector extends BaseJavaCstVisitorWithDefaults {
    constructor() {
        super();
        this.loops = [];
        this.validateVisitor();
    }

    whileStatement(ctx) {
        const whileLoop = {
            type: 'whileLoop',
            expr: ctx.hasOwnProperty('expression') ? getLeafNodes(ctx.expression[0].children) : null,
            blockCst: ctx.hasOwnProperty('statement') ? ctx.statement[0] : null
        };
        this.loops.push(whileLoop);
    }
}

export function getWhileLoops(cst) {
    let whileLoopCollector = new WhileLoopCollector();
    whileLoopCollector.visit(cst);
    if (whileLoopCollector.loops > 0) throw ('Too many loops in whileLoopCollector'); //For dev purposes only, delete later
    return whileLoopCollector.loops[0];
}

export function getWhileLoopBigO(stmt) {
    
}