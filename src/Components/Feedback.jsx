import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { makchaApi } from "../api";
import { Container } from "./common";

const { Item } = Form;

export default class Feedback extends Component {
  render() {
    return (
      <Container>
        <Form>
          <Item>{/* ready */}</Item>
        </Form>
        <Button>확인</Button>
      </Container>
    );
  }
}
