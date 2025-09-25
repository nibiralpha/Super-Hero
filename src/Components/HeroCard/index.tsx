import React, { useEffect, useState } from 'react';

import './index.less';
import { Col, Row, Switch, Modal, Button, Space } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  UpCircleOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import useTeam from "../../hooks/useTeam";

import HeroModel from "../../model/Hero.model";
import { MessageObject } from "../../model/MessageData.modal";

type Props = {
  hero: HeroModel
};

type HoverClass = '' | 'hoverShow'

const HeroCard = (props: Props) => {
  const [hoverClass, setHoverClass] = useState<HoverClass>('');
  const { isOnTeam, isMaxReached, isGoodBadMixed, addMemberToTeam, removeMemberFromTeam } = useTeam();
  const [msg, setMsg] = useState<MessageObject>({ error: false, msg: '', desc: '' });
  const history = useHistory();

  useEffect(() => { }, []);

  const addHero = (): void => {
    if (isMaxReached()) {
      setMsg({ error: true, msg: 'Ops! You have too many team members', desc: 'You may only select 8 team members at a time' });
      return
    }
    if (isGoodBadMixed(props.hero)) {
      setMsg({ error: true, msg: 'Ops! You can create mixed type of super team', desc: 'Team can only contain one type of hero (Good or Bad)' });
      return
    }

    addMemberToTeam(props.hero);
  }

  const removeHero = () => {
    removeMemberFromTeam(props.hero)
  }

  return (
    <div
      className={`hero-card`}
      onMouseLeave={() => {
        setHoverClass('');
      }}
    >
      <div className="hero-card-wrapper">
        <Link to={`/hero/details/${props.hero.id}`}>
          <div className="hero-card-img">
            <img src={"/images/card.jpg"} />
            {/* <img src={props.hero?.image?.url} /> */}
          </div>
        </Link>
        <div className="hero-card-content">
          <div className="card-content-title primary size-20 white mb-5 cursor" onClick={() => {
            history.push(`/hero/details/${props.hero.id}`);
          }}>{props.hero?.name}</div>

          <div className="card-content-actions flex flex-justify-center mb-5">
            <div className="action-label mr-10 white">Add to team</div>

            <div className="action-label">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={isOnTeam(props.hero)}
                onChange={(e) => { e ? addHero() : removeHero() }}
              />
            </div>
          </div>
        </div>
        <div className="card-content-arrow">
          <UpCircleOutlined
            width="100"
            className="white-arrow"
            onMouseEnter={() => {
              setHoverClass('hoverShow');
            }}

          />
        </div>

        <div className={`hover-card ${hoverClass}`} onMouseLeave={() => {
          setHoverClass('');
        }}>
          <div className="hover-card-body">
            <div className="hover-card-contents">
              <div className="hover-card-title white primary size-20 mb-15">{props.hero?.name}</div>

              <div className="card-content-actions flex flex-justify-center mb-20">
                <div className="action-label mr-10 white">Add to team</div>

                <div className="action-label">
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={isOnTeam(props.hero)}
                    onChange={(e) => { e ? addHero() : removeHero() }}
                  />
                </div>
              </div>

              <div className="hover-card-item white primary size-16">Intelligence : {props.hero?.powerstats?.intelligence} </div>
              <div className="hover-card-item white primary size-16">strength : {props.hero?.powerstats?.strength}</div>
              <div className="hover-card-item white primary size-16">Speed : {props.hero?.powerstats?.speed}</div>
              <div className="hover-card-item white primary size-16">Durability : {props.hero?.powerstats?.durability}</div>
              <div className="hover-card-item white primary size-16">Power : {props.hero?.powerstats?.durability}</div>
              <div className="hover-card-item white primary size-16">Combat : {props.hero?.powerstats?.combat}</div>
            </div>
          </div>
        </div>

      </div>
      <Modal centered className="custom-modal" footer={null} title="" visible={msg?.error} onCancel={() => { setMsg({ error: false, msg: '', desc: '' }) }}>
        <div>
          <div className="primary black size-20">{msg?.msg}</div>
          <div className="black size-16 mt-10">{msg?.desc}</div>
        </div>
      </Modal>
    </div>
  );
};

export default HeroCard;
