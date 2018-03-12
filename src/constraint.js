// Core/NPM Modules
const esprima = require("esprima");
const faker   = require("faker");
const fs      = require('fs');
const Random  = require('random-js');
const _       = require('lodash');
const randexp = require('randexp');



// Set options
faker.locale  = "en";
const options = { tokens: true, tolerant: true, loc: true, range: true };



// Create random generator engine
const engine = Random.engines.mt19937().autoSeed();


/**
 * Constraint class. Represents constraints on function call parameters.
 *
 * @property {String}                                                          ident      Identity of the parameter mapped to the constraint.
 * @property {String}                                                          expression Full expression string for a constraint.
 * @property {String}                                                          operator   Operator used in constraint.
 * @property {String|Number}                                                   value      Main constraint value.
 * @property {String|Number}                                                   altvalue   Constraint alternative value.
 * @property {String}                                                          funcName   Name of the function being constrained.
 * @property {'fileWithContent'|'fileExists'|'integer'|'string'|'phoneNumber'} kind       Type of the constraint.
 */
class Constraint {
    constructor(properties){
        this.ident = properties.ident;
        this.expression = properties.expression;
        this.operator = properties.operator;
        this.value = properties.value;
        this.altvalue = properties.altvalue;
        this.funcName = properties.funcName;
        this.kind = properties.kind;
    }
}


/**
 * Generate function parameter constraints for an input file
 * and save them to the global functionConstraints object.
 *
 * @param   {String} filePath Path of the file to generate tests for.
 * @returns {Object}          Function constraints object.
 */
function constraints(filePath) {

    // Initialize function constraints directory
    let functionConstraints = {};

    // Read input file and parse it with esprima.
    let buf = fs.readFileSync(filePath, "utf8");
    let result = esprima.parse(buf, options);

    // Start traversing the root node
    traverse(result, function (node) {

        // If some node is a function declaration, parse it for potential constraints.
        if (node.type === 'FunctionDeclaration') {

            // Get function name and arguments
            let funcName = functionName(node);
            let params = node.params.map(function(p) {return p.name});

            // Initialize function constraints
            functionConstraints[funcName] = {
                constraints: _.zipObject(params, _.map(params, () => [])),
                params: params
            };

            // Traverse function node.
            traverse(node, function(child) {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // Handle equivalence expression
                if(_.get(child, 'type') === 'BinaryExpression' && _.includes(['!=', '!==', '==', '==='], _.get(child, 'operator'))) {
                    if(_.get(child, 'left.type') === 'Identifier') {

                        // Get identifier
                        let ident = child.left.name;

                        // Get expression from original source code:
                        let expression = buf.substring(child.range[0], child.range[1]);
                        let rightHand = buf.substring(child.right.range[0], child.right.range[1]);

                        // Test to see if right hand is a string
                        let match = rightHand.match(/^['"](.*)['"]$/);
                      //  console.log("ident: " + match+"\n");
                        if (_.includes(params, _.get(child, 'left.name'))) {

                            // Push a new constraints
                            let constraints = functionConstraints[funcName].constraints[ident];
                            constraints.push(new Constraint({
                                ident: child.left.name,
                                value: rightHand,
                                funcName: funcName,
                                kind: "integer",
                                operator : child.operator,
                                expression: expression
                            }));
                            constraints.push(new Constraint({
                                ident: child.left.name,
                                value: match ? `'NEQ - ${match[1]}'` : NaN,
                                funcName: funcName,
                                kind: "integer",
                                operator : child.operator,
                                expression: expression
                            }));
                        }
                    }
                }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              // check for '<' type
               if(_.get(child, 'type') === 'BinaryExpression' && _.includes(['<','>','>=','<='], _.get(child, 'operator'))) {
                   if(_.get(child, 'left.type') === 'Identifier') {

                       // Get identifier
                       let ident = child.left.name;

                       // Get expression from original source code:
                       let expression = buf.substring(child.range[0], child.range[1]);
                       let rightHand = buf.substring(child.right.range[0], child.right.range[1]);
                       // Test to see if right hand is a string
                       let match = rightHand.match(/^['"](.*)['"]$/);
                       if (_.includes(params, _.get(child, 'left.name'))) {

                           // Push a new constraints
                           let constraints = functionConstraints[funcName].constraints[ident];
                           constraints.push(new Constraint({
                               ident: child.left.name,
                               value: parseInt(rightHand)-1,
                               funcName: funcName,
                               kind: "integer",
                               operator : child.operator,
                               expression: expression
                           }));
                           constraints.push(new Constraint({
                               ident: child.left.name,
                               value: parseInt(rightHand)+1,
                               funcName: funcName,
                               kind: "integer",
                               operator : child.operator,
                               expression: expression
                           }));
                       }
                   }
               }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              // handle membership equality
               if(_.get(child, 'type') === 'BinaryExpression' && _.includes(['!=','!==','==','==='], _.get(child, 'operator'))) {
                   if(_.get(child, 'left.type') === 'CallExpression') {
                     let ident = child.left.callee.object.name;
                     let expression = buf.substring(child.range[0], child.range[1]);
                     // let rightHand = buf.substring(child.right.range[0], child.right.range[1]);

                     // console.log("righthand: " + rightHand+"\n");
                     let match = child.left.arguments[0].raw.match(/^['"](.*)['"]$/);
                     if (_.includes(params, _.get(child, 'left.callee.object.name'))) {
                        //  console.log("match: " + match+"\n");
                         // Push a new constraints
                         let constraints = functionConstraints[funcName].constraints[ident];
                         constraints.push(new Constraint({
                             ident: child.left.callee.object.name,
                             value: child.left.arguments[0].raw,
                             funcName: funcName,
                             kind: "string",
                             operator : child.operator,
                             expression: expression
                         }));
                         constraints.push(new Constraint({
                             ident: child.left.callee.object.name,
                             value: match ? `'NEQ - ${match[1]}'` : NaN,
                             funcName: funcName,
                             kind: "string",
                             operator : child.operator,
                             expression: expression
                         }));
                     }

                   }
               }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

              // handle call expression inequality
               if(_.get(child, 'type') === 'BinaryExpression' && _.includes(['<','>','<=','>='], _.get(child, 'operator'))) {
                   if((_.get(child, 'left.type') === 'CallExpression') && _.get(child, 'left.property.name') === 'length') {
                     let ident = child.left.object.name;
                     let expression = buf.substring(child.range[0], child.range[1]);
                     // let rightHand = buf.substring(child.right.range[0], child.right.range[1]);
                     // console.log("expression: " + expression+"\n");
                     // console.log("righthand: " + rightHand+"\n");
                     let match = child.left.arguments[0].raw.match(/^['"](.*)['"]$/);
                     if (_.includes(params, _.get(child, 'left.callee.object.name'))) {
                        //  console.log("match: " + match+"\n");
                         // Push a new constraints
                         let constraints = functionConstraints[funcName].constraints[ident];
                         constraints.push(new Constraint({
                             ident: child.left.callee.object.name,
                             value: child.left.arguments[0].raw,
                             funcName: funcName,
                             kind: "string",
                             operator : child.operator,
                             expression: expression
                         }));
                         constraints.push(new Constraint({
                             ident: child.left.callee.object.name,
                             value: match ? `'NEQ - ${match[1]}'` : NaN,
                             funcName: funcName,
                             kind: "string",
                             operator : child.operator,
                             expression: expression
                         }));
                     }

                   }
               }



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              // literals
              if(_.get(child,'left.type') === 'Identifier' && child.right.type === 'Literal'){

                      if (params.length == 1) {

                                let expression = buf.substring(child.range[0], child.range[1]);
                                let rightHand = buf.substring(child.right.range[0], child.right.range[1]);
                                let match = rightHand.match(/^['"](.*)['"]$/);
                                let number = rightHand + faker.random.number({min:0000000,max:9999999});
                                let right = number.replace(/['"]+/g, '');
                                 console.log("expression: " + expression + " righthand: " + rightHand + " match: " + match +
                               " number: " + number + " right: " + right +"\nfuncname: "+ funcName +"\n");

                                // Get identifier
                                let ident = params[0];
                                // Push a new constraint
                                functionConstraints[funcName].constraints[ident].push(new Constraint({
                                    ident: params[0],
                                    value:  `"${right}"`,
                                    funcName: funcName,
                                    kind: "phoneNumber",
                                    operator : child.operator,
                                    expression: expression
                                }));
                                functionConstraints[funcName].constraints[ident].push(new Constraint({
                                    ident: params[0],
                                    value:  `"${faker.phone.phoneNumberFormat(1)}"`,
                                    funcName: funcName,
                                    kind: "phoneNumber",
                                    operator : child.operator,
                                    expression: expression
                                }));
                            }
                    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // unary expressions
            if(_.get(child,'type') === 'UnaryExpression' && child.operator === '!'){
                    if (child.argument.type === 'CallExpression') {
                      if(_.includes(params, child.argument.arguments[0].name))
                        {
                              let ident = child.argument.arguments[0].name;
                              let expression = buf.substring(child.range[0], child.range[1]);

                              //if(flag)
                          //    console.log("1....expression: " + expression+" ident: "+ident+ " funcrionname " + funcName +"\n");
                              // Push a new constraint
                              functionConstraints[funcName].constraints[ident].push(new Constraint({
                                  ident: child.argument.arguments[0].name,
                                  value:  "emptyDir",
                                  funcName: funcName,
                                  kind: "pathExists",
                                  operator : child.operator,
                                  expression: expression
                              }));
                              functionConstraints[funcName].constraints[ident].push(new Constraint({
                                  ident: child.argument.arguments[0].name,
                                  value:  "nonEmptyDir",
                                  funcName: funcName,
                                  kind: "pathExists",
                                  operator : child.operator,
                                  expression: expression
                              }));
                          }
                    }
                    else if(child.argument.type == 'Identifier')
                    {
                          let ident = child.argument.name;
                          let expression = buf.substring(child.range[0], child.range[1]);

                          functionConstraints[funcName].constraints[ident].push(new Constraint({
                              ident: child.argument.name,
                              value:  true,
                              funcName: funcName,
                              kind: "string",
                              operator : child.operator,
                              expression: expression
                          }));
                          functionConstraints[funcName].constraints[ident].push(new Constraint({
                              ident: child.argument.name,
                              value:  false,
                              funcName: funcName,
                              kind: "string",
                              operator : child.operator,
                              expression: expression
                          }));
                    }
                    else if (child.argument.type == 'MemberExpression')
                    {
                        property = child.argument.property.name;
					              let correctOption = "{"+property+": true}";
					              let wrongOption = "{"+property+": false}";
                        let ident = child.argument.object.name;
                        let expression = buf.substring(child.range[0], child.range[1]);

                        functionConstraints[funcName].constraints[ident].push(new Constraint({
                            ident: child.argument.object.name,
                            value:  correctOption,
                            funcName: funcName,
                            kind: "string",
                            operator : child.operator,
                            expression: expression
                        }));
                        functionConstraints[funcName].constraints[ident].push(new Constraint({
                            ident:  child.argument.object.name,
                            value:  wrongOption,
                            funcName: funcName,
                            kind: "string",
                            operator : child.operator,
                            expression: expression
                        }));

                    }
                  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  //existsSync
                    if(_.get(child,'callee.property.name') === 'existsSync')
                    {
                        // Get expression from original source code:
                        let expression = buf.substring(child.range[0], child.range[1]);
                        if(_.includes(params,  child.arguments[0].name))
                         {
                            // Get identifier
                            let ident =  child.arguments[0].name;
                            let constraints = functionConstraints[funcName].constraints[ident];
                            // Push a new constraint
                            functionConstraints[funcName].constraints[ident].push(new Constraint({
                                ident:  child.arguments[0].name,
                                value:  "'emptyDir'",
                                funcName: funcName,
                                kind: "fileExists",
                                operator : child.operator,
                                expression: expression
                            }));
                            functionConstraints[funcName].constraints[ident].push(new Constraint({
                                ident:  child.arguments[0].name,
                                value:  "'nonEmptyDir'",
                                funcName: funcName,
                                kind: "fileExists",
                                operator : child.operator,
                                expression: expression
                            }));
                            functionConstraints[funcName].constraints[ident].push(new Constraint({
                                ident:  child.arguments[0].name,
                                value:  "'file'",
                                funcName: funcName,
                                kind: "pathExists",
                                operator : child.operator,
                                expression: expression
                            }));
                        }
                    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // Handle fs.readFileSync
                if( child.type === "CallExpression" && child.callee.property && child.callee.property.name === "readFileSync" ) {

                    // Get expression from original source code:
                    let expression = buf.substring(child.range[0], child.range[1]);
                  //  console.log(expression);
                    for (let p in params) {
                        if( child.arguments[0].name === params[p] ) {

                            // Get identifier
                            let ident = params[p];
                            //console.log("ident " + ident);
                            // Push a new constraint
                            functionConstraints[funcName].constraints[ident].push(new Constraint({
                                ident: params[p],
                                value:  "'pathContent/file1'",
                                funcName: funcName,
                                kind: "fileWithContent",
                                operator : child.operator,
                                expression: expression
                            }));
                            functionConstraints[funcName].constraints[ident].push(new Constraint({
                                ident: params[p],
                                value:  "'pathContent/someDir'",
                                funcName: funcName,
                                kind: "fileWithContent",
                                operator : child.operator,
                                expression: expression
                            }));
                        }
                    }
                }

            });

            // console.log( functionConstraints[funcName]);

        }
    });

    return functionConstraints;
}

/**
 * Traverse an object tree, calling the visitor at each
 * visited node.
 *
 * @param {Object}   object  Esprima node object.
 * @param {Function} visitor Visitor called at each node.
 */
function traverse(object, visitor) {

    // Call the visitor on the object
    visitor(object);

    // Traverse all children of object
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}


/**
 * Return the name of a function node.
 */
function functionName(node) {
    return node.id ? node.id.name : '';
}


/**
 * Generates an integer value based on some constraint.
 *
 * @param   {Number}  constraintValue Constraint integer.
 * @param   {Boolean} greaterThan     Whether or not the concrete integer is greater than the constraint.
 * @returns {Number}                  Integer satisfying constraints.
 */
function createConcreteIntegerValue(constraintValue, greaterThan) {
    if( greaterThan ) return Random.integer(constraintValue + 1, constraintValue + 10)(engine);
    else return Random.integer(constraintValue - 10, constraintValue - 1)(engine);
}


// Export
module.exports = constraints;
