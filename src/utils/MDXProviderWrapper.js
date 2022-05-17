/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXEmbedProvider } from 'mdx-embed';

import Image from 'next/image';
import NextLink from 'next/link';

import {
  Button,
  Code,
  Box,
  Heading,
  Link,
  OrderedList,
  SimpleGrid,
  Text,
  UnorderedList,
  useTheme,
} from '@chakra-ui/react';

import PrismHighlight, { defaultProps } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/nightOwl';

/* 
  add support for additional prism language highlighting prism-react-renderer docs:
  https://github.com/FormidableLabs/prism-react-renderer
*/
import Prism from 'prism-react-renderer/prism';
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-php');

const CustomHeading = ({ as, children, id, ...rest }) => {
  if (id) {
    return (
      <Heading
        as={as}
        id={id}
        {...rest}
        _hover={{
          _after: {
            content: '"#"',
            fontSize: 'smaller',
            color: 'green.700',
            position: 'relative',
            paddingRight: '0.5ch',
          },
        }}
      >
        <NextLink href={`#${id}`}>
          <a>{children}</a>
        </NextLink>
      </Heading>
    );
  }

  return <Heading as={as} {...rest} />;
};
const H1 = (props) => <CustomHeading as="h1" {...props} />;
const H2 = (props) => <CustomHeading as="h2" {...props} />;
const H3 = (props) => <CustomHeading as="h3" {...props} />;
const H4 = (props) => <CustomHeading as="h4" {...props} />;
const H5 = (props) => <CustomHeading as="h5" {...props} />;
const H6 = (props) => <CustomHeading as="h6" {...props} />;
const P = (props) => <Text marginBottom="1rem" {...props} />;

const CustomLink = (props) => {
  const theme = useTheme();
  return <Link color={theme.colors.pink[600]} {...props} />;
};

const Highlight = (props) => <Text as="mark" {...props} />;

const InlineCode = (props) => {
  const theme = useTheme();

  return (
    <Code
      borderRadius=".3em"
      padding="0.1ch 1ch"
      maxW={'calc(100vw - 60px)'}
      style={{
        wordWrap: 'break-word',
      }}
      display={'inline'}
      {...props}
    />
  );
};

const Pre = (props) => {
  const classNames = props.children.props.className || '';
  const matches = classNames.match(/language-(?<lang>.*)/);
  return (
    <Box marginBottom="2rem" marginTop="2rem">
      <PrismHighlight
        {...defaultProps}
        theme={prismTheme}
        code={props.children.props.children}
        language={
          matches && matches.groups && matches.groups.lang
            ? matches.groups.lang
            : ''
        }
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, padding: '16px', overflowX: 'scroll' }}
          >
            {tokens.map((line, i) => {
              // TODO: why is this needed though?
              if (i === tokens.length - 1) return null;
              return (
                // eslint-disable-next-line react/jsx-key
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    // eslint-disable-next-line react/jsx-key
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </PrismHighlight>
    </Box>
  );
};

const NextOptimizedImage = (props) => (
  // height and width are part of the props, so they get automatically passed here with {...props}
  <Image {...props} layout="responsive" loading="lazy" alt={props?.alt} />
);

const UnorderedListComponent = ({ children, ...rest }) => (
  <UnorderedList {...rest} stylePosition={'outside'} ml="1rem" mb="1rem">
    {children}
  </UnorderedList>
);

const OrderedListComponent = ({ children, ...rest }) => (
  <OrderedList {...rest} stylePosition={'outside'} ml="1rem" mb="1rem">
    bois{children}
  </OrderedList>
);

const components = {
  Button,
  Highlight,
  img: NextOptimizedImage,
  inlineCode: InlineCode,
  ol: OrderedListComponent,
  ul: UnorderedListComponent,
  a: CustomLink,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  pre: Pre,
  SimpleGrid,
};

// eslint-disable-next-line react/prop-types
const MDXProviderWrapper = ({ children }) => (
  <MDXEmbedProvider>
    <MDXProvider components={components}>{children}</MDXProvider>
  </MDXEmbedProvider>
);

export default MDXProviderWrapper;
