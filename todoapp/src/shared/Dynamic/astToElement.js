function value({ value }) {
  return value;
}

function visitChildren(children) {
  const c = children
    .filter(({ type, value }) => !(type === 'JSXText' && !/[^\s↵]/.test(value)))
    .map(visit);
  return 1 < c.length ? [c] : c[0];
}

function visitExpression({ expression }) {
  return visit(expression);
}

function visit(node) {
  try {
    return {
      BooleanLiteral: value,
      CallExpression({ arguments: args, callee: { name } }) {
        return {
          t({ value }) {
            return ['trans', value];
          }
        }[name](...args);
      },
      Directive({ value }) {
        return visit(value);
      },
      DirectiveLiteral: value,
      ExpressionStatement: visitExpression,
      Identifier({ name }) {
        return ['prop', name];
      },
      JSXElement({
        children,
        closingElement,
        openingElement: {
          attributes,
          name: { name }
        }
      }) {
        return [
          'element',
          {
            type: name,
            props: Object.fromEntries(
              attributes.map(({ name: { name }, value }) => [
                name,
                value ? visit(value) : true
              ])
            ),
            children: visitChildren(children)
          }
        ];
      },
      JSXExpressionContainer: visitExpression,
      JSXFragment({ children }) {
        return [
          'element',
          {
            type: 'Fragment',
            children: visitChildren(children)
          }
        ];
      },
      JSXText({ value }) {
        return value.trim();
      },
      NullLiteral() {
        return null;
      },
      NumericLiteral: value,
      StringLiteral: value,
      TemplateLiteral({
        quasis: [
          {
            value: { raw }
          }
        ]
      }) {
        return raw;
      }
    }[node.type](node);
  } catch (error) {
    console.log(node);
    throw error;
  }
}

export default function astToElement(ast) {
  const { body, directives } = ast.program;
  return visit((directives.length ? directives : body)[0]);
}
